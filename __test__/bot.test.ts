import { Message } from 'discord.js';// @ts-ignore
import { optionsBuilder, interactionBuilder } from 'discord.js-mock-interactions';
import { MyBotClient } from '../discord/client'

describe('My Discord Bot', () => {
  let interaction: any;
  let options : any;
  let modifybal: any;
  let client: MyBotClient;

  options = {}

  beforeEach(() => {
    client = new MyBotClient(options);
    interaction = new interactionBuilder({
      client, 
      applicationId: process.env.APPLICATION_ID,
      guildId: process.env.GUILD_ID,
      channelId: process.env.CHANNEL_ID,
      userId: process.env.USER_ID
    });
    const modifybalReply = async ( resp: any ) => console.log('modifybalReply', JSON.stringify(resp));
    const modifybalDeferReply = async ( resp: any ) => console.log('modifybalDeferReply', JSON.stringify(resp));
    const modifybalEditReply = async ( resp: any ) => console.log('modifybalEditReply', JSON.stringify(resp));
    const modifybalFollowUp = async ( resp: any ) => console.log('modifybalFollowUp', JSON.stringify(resp));
    const modifybalDeleteReply = async ( resp: any ) => console.log('modifybalDeleteReply', JSON.stringify(resp));
    //probably don't need all of them

    modifybal = interaction({
        type: "APPLICATION_COMMAND",
        name: "modifybal",
        subcommand: "add",
        commandId: '1234',
        reply: modifybalReply,
        deferReply: modifybalDeferReply,
        editReply: modifybalEditReply,
        followUp: modifybalFollowUp,
        deleteReply: modifybalDeleteReply,
        options: [
           // await opts.build({id: 'bun', name:'user'}),
           // await opts.build({id: 'int', name:'amount', value: 1000})
        ]
    });
  });
  
  afterEach(() => {
    interaction.cleanup();
  });
  
  it('should respond to messages', async () => {
    client.emit('interactionCreate', modifybal);  //emit the interaction
    const message: Message = interaction.getMessage({
      content: '!ping',
    });

    client.emit('message', message);

    expect(message.channel.send).toHaveBeenCalledWith('Pong!');
  });
});
