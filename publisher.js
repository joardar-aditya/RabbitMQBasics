//The library requiring the The 'Advanced Message Queuing Protocol (AMQP) -: (amqp.org)
const amp = require("amqplib");

//Sample message, in real world it would be more dynamic
const msg = {number : process.argv[2]}

//Connect Function
connect();

//
async function connect() {
  try {
    //STEP 1-: Establish the connection with the exposed rabbitmq server
    const connection = await amp.connect("amqp://localhost:7070");
    //STEP 2-: Create the channel for consistent communication
    const channel = await connection.createChannel();
    //STEP 3 -: Assert a particular queue of message in the channel. Visit -: https://www.squaremobius.net/amqp.node/channel_api.html#channel_assertQueue
    const result = await channel.assertQueue("jobs");
    //enqueues the messages in the queue
    channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
    console.log(`Job sent successful! ${msg.number}`)
  }catch (ex){
    console.error(ex);
  }
}