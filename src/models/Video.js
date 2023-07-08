import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  fileUrl: { type: String, required: true },
  description: {
    type: String,
    required: true,
    default: "해당 비디오에 대한 소개 내용 없습니다.",
    trim: true,
    maxLength: 140,
  },
  createdAt: { type: Date, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
});

videoSchema.static("parseHashtags", function (hashtags) {
  return hashtags.split(",").map((word) => {
    const trimmedWord = word.trim();
    return trimmedWord.startsWith("#") ? trimmedWord : `#${trimmedWord}`;
  });
});

videoSchema.pre("validate", function (next) {
  this.description = this.description.trim();

  if (this.description === "") {
    this.description = "해당 비디오에 대한 소개 내용 없습니다.";
  }
  next();
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
