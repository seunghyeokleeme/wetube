import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  description: {
    type: String,
    required: true,
    default: "해당 비디오에 대한 소개 내용 없습니다.",
    trim: true,
    maxLength: 140,
  },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    likes: { type: Number, default: 0, required: true },
  },
});

videoSchema.static("parseHashtags", function (hashtags) {
  return hashtags.split(",").map((word) => {
    const trimmedWord = word.trim();
    return trimmedWord.startsWith("#") ? trimmedWord : `#${trimmedWord}`;
  });
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
