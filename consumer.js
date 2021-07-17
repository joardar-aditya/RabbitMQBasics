//The library requiring the The 'Advanced Message Queuing Protocol (AMQP) -: (amqp.org)
/** The Protocol in short is a communication protocol for business messages between applications */
const amqp = require("amqplib");

//Calling the function
connect();


async function connect() {
  try{
    //STEP 1-: Establish the connection with the exposed rabbitmq server
    const connection = await amqp.connect("amqp://localhost:7070");

    //STEP 2-: Create the channel for consistent communication
    const channel = await connection.createChannel();

    //STEP 3 -: Assert a particular queue of message in the channel. Visit -: https://www.squaremobius.net/amqp.node/channel_api.html#channel_assertQueue
    const result = await channel.assertQueue("jobs");

    //Consume (The the messages in the queue, which will be sent untill they are acknowledged)
    channel.consume("jobs", message => {
      //message is the individual message returned by the queue
      const input = JSON.parse(message.content.toString())
      //Can add other log statements to get more details from the string sent

      if (input != null){
        console.log(`The message is: ${input.number.toString()}`)
        //Channel acknowledges the message
        channel.ack(message);

        //The message is removed from the queue
      }
    });

    console.log("Waiting for Messages....");

  }catch(ex) {
    console.error(`Error in exception: ${ex}`);
  }
}
