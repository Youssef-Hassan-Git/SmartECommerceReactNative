import moment from "moment"

export const getDateFromFireStoreTimeStampObject = (firestoreDateObject: any) =>{
    const date = new Date(firestoreDateObject.seconds * 1000);
    return moment(date).format("MMMM Do, hh:mm A")
}