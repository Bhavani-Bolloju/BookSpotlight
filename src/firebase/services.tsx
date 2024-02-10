import { db } from "./firebaseSetup";
import {
  doc,
  arrayUnion,
  updateDoc,
  getDoc,
  arrayRemove
} from "firebase/firestore";

// interface BookDetailsProp {
//   title: string;
//   id: string;
//   author: string;
// }

interface BookDetailsProp {
  author: string;
  description: string;
  id: string;
  thumbnail: string;
  title: string;
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
  bookDetails: BookDetailsProp,
  isBookmarked: boolean
) {
  const userDocRef = doc(db, "users", docId);

  if (isBookmarked) {
    // Remove the book from bookmarks
    await updateDoc(userDocRef, { bookmarks: arrayRemove(bookDetails) });
  } else {
    // Add the book to bookmarks
    await updateDoc(userDocRef, { bookmarks: arrayUnion(bookDetails) });
  }
};

export const getBookmarkedBook = async function (
  docId: string,
  bookmarkId: string
) {
  const userDocRef = doc(db, "users", docId);
  const userDocSnapshot = await getDoc(userDocRef);
  const snapshot = userDocSnapshot.data()?.bookmarks;

  const bookmarked = snapshot?.find(
    (book: BookDetailsProp) => book.id === bookmarkId
  );
  return bookmarked;
};
