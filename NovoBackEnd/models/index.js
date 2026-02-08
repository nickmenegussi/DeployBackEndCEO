import { UserModel } from "./UserModel.js";
import { LectureModel } from "./LectureModel.js";
import { BookModel } from "./LibraryModel.js";
import { GroupOfStudyModel } from "./GroupOfStudy.js";
import { CategoryModel } from "./CategoryModel.js";
import { TopicModel } from "./TopicModel.js";
import { PostModel } from "./PostModel.js";
import { CommentModel } from "./CommentModel.js";
import { NotificationModel } from "./NotificationModel.js";
import { CalendarEventModel } from "./CalendarEventModel.js";
import { LoanModel } from "./LoanModel.js";
import { FavoriteModel } from "./FavoriteModel.js";
import { LikeModel } from "./LikeModel.js";
import { ReserveModel } from "./ReserveModel.js";
import { CartModel } from "./CartModel.js";
import { VolunteerWorkModel } from "./VolunteerWorkModel.js";
import { FacilitatorModel } from "./FacilitatorModel.js";
import { ReviewModel } from "./ReviewModel.js";
import { OtpModel } from "./OtpModel.js";

// --- Associations ---

// ReviewSociety
UserModel.hasMany(ReviewModel, { foreignKey: "userId", as: "reviews" });
ReviewModel.belongsTo(UserModel, { foreignKey: "userId", as: "user" });

// Reserves
UserModel.hasMany(ReserveModel, { foreignKey: "User_idUser", as: "reserves" });
ReserveModel.belongsTo(UserModel, { foreignKey: "User_idUser", as: "user" });
BookModel.hasMany(ReserveModel, { foreignKey: "Book_idLibrary", as: "reserves" });
ReserveModel.belongsTo(BookModel, { foreignKey: "Book_idLibrary", as: "book" });

// Cart
UserModel.hasMany(CartModel, { foreignKey: "User_idUser", as: "cartItems" });
CartModel.belongsTo(UserModel, { foreignKey: "User_idUser", as: "user" });
BookModel.hasMany(CartModel, { foreignKey: "Book_idLibrary", as: "cartItems" });
CartModel.belongsTo(BookModel, { foreignKey: "Book_idLibrary", as: "book" });

// Category & Topic & Post
UserModel.hasMany(CategoryModel, { foreignKey: "User_idUser", as: "categories" });
CategoryModel.belongsTo(UserModel, { foreignKey: "User_idUser", as: "user" });

UserModel.hasMany(TopicModel, { foreignKey: "User_idUser", as: "topics" });
TopicModel.belongsTo(UserModel, { foreignKey: "User_idUser", as: "user" });
CategoryModel.hasMany(TopicModel, { foreignKey: "Category_id", as: "topics" });
TopicModel.belongsTo(CategoryModel, { foreignKey: "Category_id", as: "category" });

UserModel.hasMany(PostModel, { foreignKey: "User_idUser", as: "posts" });
PostModel.belongsTo(UserModel, { foreignKey: "User_idUser", as: "user" });
TopicModel.hasMany(PostModel, { foreignKey: "Topic_idTopic", as: "posts" });
PostModel.belongsTo(TopicModel, { foreignKey: "Topic_idTopic", as: "topic" });

// Comments
PostModel.hasMany(CommentModel, { foreignKey: "Post_idPost", as: "comments" });
CommentModel.belongsTo(PostModel, { foreignKey: "Post_idPost", as: "post" });
UserModel.hasMany(CommentModel, { foreignKey: "User_idUser", as: "comments" });
CommentModel.belongsTo(UserModel, { foreignKey: "User_idUser", as: "user" });

// Likes
PostModel.hasMany(LikeModel, { foreignKey: "Post_idPost", as: "likes" });
LikeModel.belongsTo(PostModel, { foreignKey: "Post_idPost", as: "post" });
UserModel.hasMany(LikeModel, { foreignKey: "User_idUser", as: "likes" });
LikeModel.belongsTo(UserModel, { foreignKey: "User_idUser", as: "user" });

// Favorite
UserModel.hasMany(FavoriteModel, { foreignKey: "User_idUser", as: "favorites" });
FavoriteModel.belongsTo(UserModel, { foreignKey: "User_idUser", as: "user" });
BookModel.hasMany(FavoriteModel, { foreignKey: "Book_idLibrary", as: "favorites" });
FavoriteModel.belongsTo(BookModel, { foreignKey: "Book_idLibrary", as: "book" });

// Loans
UserModel.hasMany(LoanModel, { foreignKey: "User_idUser", as: "loans" });
LoanModel.belongsTo(UserModel, { foreignKey: "User_idUser", as: "user" });
BookModel.hasMany(LoanModel, { foreignKey: "Book_idLibrary", as: "loans" });
LoanModel.belongsTo(BookModel, { foreignKey: "Book_idLibrary", as: "book" });

// Facilitadores & GroupOfStudy
UserModel.hasOne(FacilitatorModel, { foreignKey: "User_idUser", as: "facilitator" });
FacilitatorModel.belongsTo(UserModel, { foreignKey: "User_idUser", as: "user" });
FacilitatorModel.hasMany(GroupOfStudyModel, { foreignKey: "IdFacilitador", as: "studyGroups" });
GroupOfStudyModel.belongsTo(FacilitatorModel, { foreignKey: "IdFacilitador", as: "facilitator" });

// Notifications
UserModel.hasMany(NotificationModel, { foreignKey: "User_idUser", as: "notifications" });
NotificationModel.belongsTo(UserModel, { foreignKey: "User_idUser", as: "user" });

// CalendarEvents
UserModel.hasMany(CalendarEventModel, { foreignKey: "User_idUser", as: "events" });
CalendarEventModel.belongsTo(UserModel, { foreignKey: "User_idUser", as: "user" });

export {
  UserModel,
  LectureModel,
  BookModel as LibraryModel,
  GroupOfStudyModel,
  CategoryModel,
  TopicModel,
  PostModel,
  CommentModel,
  NotificationModel,
  CalendarEventModel,
  LoanModel,
  FavoriteModel,
  LikeModel,
  ReserveModel,
  CartModel,
  VolunteerWorkModel,
  FacilitatorModel,
  ReviewModel,
  OtpModel,
};