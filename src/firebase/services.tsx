import { db } from "./firebaseSetup";
import {
  doc,
  arrayUnion,
  updateDoc,
  getDoc,
  arrayRemove
} from "firebase/firestore";
import { BookItemProp } from "../components/home/BookItem";

// interface BookDetailsProp {
//   title: string;
//   id: string;
//   author: string;
// }

interface BookDetailsProp extends Omit<BookItemProp, "author"> {
  author: string;
}

// const book: BookDetailsProp = {
//   author: "neha"
// };

export const getBookmarks = async function (docId: string) {
  const userDocRef = doc(db, "users", docId);
  const userDocSnapshot = await getDoc(userDocRef);
  const snapshot = userDocSnapshot.data()?.bookmarks;
  const bookmarkIds = snapshot.map((snapItem: BookDetailsProp) => snapItem.id);

  return bookmarkIds;
};

export const modifyBookmarks = async function (
  docId: string,
  bookDetails: BookDetailsProp
) {
  const userDocRef = doc(db, "users", docId);

  const bookmarks = await getBookmarks(docId);

  const isBookmarked = bookmarks.some(
    (bookmark: string) => bookmark === bookDetails.id
  );

  if (isBookmarked) {
    // Remove the book from bookmarks
    await updateDoc(userDocRef, { bookmarks: arrayRemove(bookDetails) });
  } else {
    // Add the book to bookmarks
    await updateDoc(userDocRef, { bookmarks: arrayUnion(bookDetails) });
  }
};
// export const modifyBookmarks = async function (
//   docId: string,
//   bookDetails: BookDetailsProp
// ) {
//   const docRef = doc(db, "users", docId);
//   await updateDoc(docRef, { bookmarks: arrayUnion(bookDetails) });
// };
