const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore');
// admin.initializeApp();
admin.initializeApp(functions.config().firebase);
const db = getFirestore();

// todo Tour
exports.bookTour = functions.database.ref('Tracking/BookTourSuccess/{bookId}/{subId}')
    .onCreate((snap, context) => {
        //const tour = snap.val();
        var tour= snap.val();
       // console.log('New  booking tour',  tour);
       // console.log('bookId',  context.params.bookId);
       // console.log('subId',  context.params.subId);
       if(tour!=null){
        var title ='Booking Tour';
       var bookingId =tour.bookingId;
       var bookingNo =tour.bookingNo;
       var totalAmount =tour.totalAmount;
       var email =tour.email;
       var monthDayYear =tour.monthDayYear;
       var fullName ='';
       var phone ='';
       var deviceType =tour.deviceType;
       var timestamp =tour.date;
       var bookingStatus =''
       var bookingPayment =''
       var deviceName='';
       var versionApp='';
       if(tour.fullName!=null){
        fullName =tour.fullName;
       }
       if(tour.deviceName!=null){
        deviceName =tour.deviceName;
       }
       if(tour.versionApp!=null){
        versionApp =tour.versionApp;
       }
      
       let data = {
        title: title,
        bookingId: bookingId,
        bookingNo: bookingNo,
        totalAmount: totalAmount,
        email: email,
        fullName: fullName,
        phone: phone,
        deviceType: deviceType,
        monthDayYear: monthDayYear,
        timestamp: timestamp,
        deviceName: deviceName,
        versionApp: versionApp,
        bookingStatus:bookingStatus,
        bookingPayment:bookingPayment,
        typeBooking: 1,// todo 1 is tour/combo : 2 hotel
      };
       return db.collection('BookTourNotification').doc(bookingNo).set(data);
     //  return db.collection('Notification').doc('BookTour').collection(timestamp.toString()).set(data);

       }
    });
exports.notificationBookTour = functions.firestore.document('BookTourNotification/{documentId}').onCreate(
    (snapshot,context) =>{
      var bookingNo = snapshot.get('bookingNo');
        var email = snapshot.get('email');
        var title_ = snapshot.get('title');
        var totalAmount = snapshot.get('totalAmount');
        var monthDayYear = snapshot.get('monthDayYear');
        var typeBooking = snapshot.get('typeBooking');
        const fullName = snapshot.get('fullName');
        var data_={
            bookingNo: bookingNo,
            email: email,
            title: title_,
            totalAmount: totalAmount,
            monthDayYear: monthDayYear,
            typeBooking: typeBooking,
            typeNotification: 1,// 1 booking, 2 delete account
            click_action: 'FLUTTER_NOTIFICATION_CLICK',
        };
            var message = {
        notification: {
            title: title_,
            body: fullName,
        },
        data:{data:JSON.stringify(data_)},
        android:{
            notification: {
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
                channel_id: 'VTV_Tracking_channel',
                
            },  
        },
       
        topic: 'Notification',
    
    };
     admin.messaging().send(message)
       .then((response) => {

       console.log('Successfully sent message:', response);
     })
  .catch((error) => {
    console.log('Error sending message:', error);
  });

}
);


// todo Hotel

exports.bookHotel = functions.database.ref('Tracking/BookHotelSuccess/{bookId}/{subId}')
    .onCreate((snap, context) => {
        //const tour = snap.val();
        var hotel= snap.val();
        console.log('New  booking hotel',  hotel);
       // console.log('bookId',  context.params.bookId);
       // console.log('subId',  context.params.subId);
       if(hotel!=null){
        var title ='Booking Hotel';
       //var bookingId =hotel.bookingId;
       var bookingNo =hotel.bookingNo;
       var totalAmount =hotel.bookingPrice;
       var email =hotel.email;
       var monthDayYear =hotel.monthDayYear;
       var fullName =hotel.fullName;
       var phone =hotel.phone;;
       var deviceType =hotel.deviceType;
       var timestamp =hotel.date;
       var bookingStatus =''
       var bookingPayment =''
       var deviceName=hotel.deviceName;
       var versionApp=hotel.versionApp;
       var trackBooking=hotel.trackBooking;
       
    
       let data = {
        title: title,
      //  bookingId: bookingId,
        bookingNo: bookingNo,
        totalAmount: totalAmount,
        email: email,
        fullName: fullName,
        phone: phone,
        deviceType: deviceType,
        monthDayYear: monthDayYear,
        timestamp: timestamp,
        deviceName: deviceName,
        versionApp: versionApp,
        bookingStatus:bookingStatus,
        bookingPayment:bookingPayment,
        trackBooking: trackBooking,
        typeBooking: 2,// todo 1 is tour/combo : 2 hotel
      };
      
       return db.collection('BookHotelNotification').doc(timestamp.toString()).set(data);
     //  return db.collection('Notification').doc('BookTour').collection(timestamp.toString()).set(data);

       }
    });
exports.notificationBookHotel = functions.firestore.document('BookHotelNotification/{documentId}').onCreate(
    (snapshot,context) =>{
      var bookingNo = snapshot.get('bookingNo');
        var email = snapshot.get('email');
        var title_ = snapshot.get('title');
        var totalAmount = snapshot.get('totalAmount');
        var monthDayYear = snapshot.get('monthDayYear');
        var typeBooking = snapshot.get('typeBooking');
        const fullName = snapshot.get('fullName');
        var data_={
            bookingNo: bookingNo,
            email: email,
            title: title_,
            totalAmount: totalAmount,
            monthDayYear: monthDayYear,
            typeBooking: typeBooking,
            typeNotification: 1,// 1 booking, 2 delete account
            click_action: 'FLUTTER_NOTIFICATION_CLICK',
        };
            var message = {
        notification: {
            title: title_,
            body: fullName,
        },
        data:{data:JSON.stringify(data_)},
        android:{
            notification: {
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
                channel_id: 'VTV_Tracking_channel',
                
            },  
        },
       
        topic: 'Notification',
    
    };
     admin.messaging().send(message)
       .then((response) => {

       console.log('Successfully sent message:', response);
     })
  .catch((error) => {
    console.log('Error sending message:', error);
  });

}
);

// todo Delete Account
exports.notificationDeleteAccount = functions.firestore.document('deleteAccount/{documentId}').onCreate(
  (snapshot,context) =>{
   
      var email = snapshot.get('email');
      var fullName = snapshot.get('fullName');
      var customercode = snapshot.get('customercode');
      var data_={
          email: email,
          fullName: fullName,
          customercode: customercode,
          typeNotification: 2,// 1 booking, 2 delete account
          click_action: 'FLUTTER_NOTIFICATION_CLICK',
      };
          var message = {
      notification: {
          title: 'Delete Account',
          body: fullName,
      },
      data:{data:JSON.stringify(data_)},
      android:{
          notification: {
              click_action: 'FLUTTER_NOTIFICATION_CLICK',
              channel_id: 'VTV_Tracking_channel',
              
          },  
      },
     
      topic: 'Notification',
  
  };
 return admin.messaging().send(message)
     .then((response) => {

     console.log('Successfully sent message:', response);
   })
.catch((error) => {
  console.log('Error sending message:', error);
});

}
);


// firebase login
// firebase deploy --only functions