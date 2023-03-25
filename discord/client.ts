import Discord from 'discord.js';

export class MyBotClient extends Discord.Client {
  constructor(options: Discord.ClientOptions) {
    super(options);

    // Initialize your bot here
    // ...
    
    this.on('ready', () => {
      console.log(`Logged in as ${this.user?.tag}!`);
    });
    
    this.on('message', message => {
      if (message.content === '!ping') {
        message.channel.send('Pong!');
      }
    });
  }
}
