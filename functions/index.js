const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore');
// admin.initializeApp();
admin.initializeApp(functions.config().firebase);
const db = getFirestore();

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
       if(tour.fullName!=null){
        fullName =tour.fullName;
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


