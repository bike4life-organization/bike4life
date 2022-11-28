import { logger, PubSubClient } from '@bike4life/commons'
import { Message } from '@google-cloud/pubsub'
import  { MailService } from '@sendgrid/mail'

import { sendgridSettings as sd } from './app/settings';

import fs = require("fs");
import nunjucks = require("nunjucks");
import path = require('path');
import { toUSVString } from 'util';

const pubsubSettings = {
  projectId: sd.PUBSUB_PROJECT_ID,
  subscriptionName: sd.NOTIFIER_PUBSUB_SUBSCRIPTION_NAME,
  topicName: sd.NOTIFIER_PUBSUB_TOPIC_NAME
}

export default async function startPullListener(): Promise<void> {
  const pubsubClient = new PubSubClient(pubsubSettings.projectId, logger)
  const sgMail = new MailService();

  try {
    const subscription = await pubsubClient.getSubscription(pubsubSettings.topicName, pubsubSettings.subscriptionName)
    logger.info('listening messages from topics')

    sgMail.setApiKey(sd.SENDGRID_APY_KEY);

    subscription.on('message', async (message: Message) => {
      const { attributes } = message
      const { topic } = attributes;
      const dataJson = JSON.parse(message.data.toString());

      //const pathToAttachment = `${__dirname}/src/assets/views/hola.html`;
      //const attachment = fs.readFileSync(pathToAttachment,'utf8');
      //console.log("antes del template")
      //nunjucks.configure('views',{autoescape: true});
      //console.log("en medio del template") 
      // D:\Escritorio\Master\Fundamentos de cloud\bike4life\apps\notifier\src\views\base.html
      // D:\Escritorio\Master\Fundamentos de cloud\bike4life\apps\notifier\src\pull-listener.ts

      //const Nuntemplate = nunjucks.render('/views/base.html',dataJson);
      //console.log("despues del template")
    
      const msg = {
        to: dataJson.user_email,
        from: sd.TO_REPLY_TO_EMAIL_SENDGRID,
        reply_to: sd.TO_REPLY_TO_EMAIL_SENDGRID,
        subject: 'User created correctly',
        /*content:[
          {
            type: 'text/html',
            value: '<h1>HOLA</h1>'
          }
        ],*/
        text: "hola",
        /*attachments: [
          {
            content: attachment,
            filename: "attachment.html",
            type: "text/html",
            disposition: "attachment"
          }
        ]*/
      }

      if(topic === "UserCorrectlyCreated") {
        console.log('hola');
      } else if(topic === "RouteOptimizedNotification"){
        console.log('hoal2');
      }

      sgMail.send(msg).catch(err => {
        console.log(err);
      });

      logger.info(`received message from topic ${attributes.topic}: ${message.id}, ${message.data.toString()}`)
      message.ack() // we ack or we will get it redelivered
    })
    // Receive callbacks for errors on the subscription
    subscription.on('error', err => {
      console.log(err)
      logger.error('error received from subscription')
    })
  } catch (err) {
    console.log(err)
    logger.error({ error: err })
    process.exit(1)
  }
}

