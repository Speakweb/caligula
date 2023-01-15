interface Vote {
    userId: string;
    vote: "sufficient" | "insufficient";
    reason: string;
    signature: string;
}

export async function askForVotes(
    client: Client,
    users: string[],
    sufficientCallback: () => void,
    insufficientCallback: () => void,
    tieCallback: () => void
) {
    const votePromises = users.map(async userId => {
        const user = client.users.cache.get(userId);
        const voteMessage = await user.send(
            "Please vote 'sufficient' or 'insufficient' and provide your reasoning."
        );
        const filter = (msg: Message) => {
            return (
                msg.author.id === userId &&
                (msg.content === "sufficient" || msg.content === "insufficient")
            );
        };
        const collected = await voteMessage.channel.awaitMessages(filter, {
            max: 1,
            time: 60000,
            errors: ["time"]
        });
        const vote = collected.first().content as "sufficient" | "insufficient";
        const reason = await collected.first().content;
        const keypair = Keypair.fromPublicKey(user.publicKey);
        const signature = keypair.sign(vote + reason);
        return { userId, vote, reason, signature };
    });
    const votes = await Promise.all(votePromises);
    const sufficientVotes = votes.filter(vote => vote.vote === "sufficient");
    const insufficientVotes = votes.filter(vote => vote.vote === "insufficient");
    votes.forEach(vote => storeVote(vote));
    if (sufficientVotes.length > insufficientVotes.length) {
        sufficientCallback();
    } else if (sufficientVotes.length < insufficientVotes.length) {
        insufficientCallback();
    } else {
        tieCallback();
    }
}