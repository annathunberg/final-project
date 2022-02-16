import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/forum";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

const User = mongoose.model("User", UserSchema);

const ForumPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  posterName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const ForumPost = mongoose.model("ForumPost", ForumPostSchema);

const CommentSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  posterName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const Comment = mongoose.model("CommentSchema", CommentSchema);

const port = process.env.PORT || 8080;
const app = express();

// middlewares to enable cors and json body parsing

app.use(cors());

app.use(express.json());

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");

  try {
    const user = await User.findOne({ accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({
        response: {
          message: "Please, log in",
        },
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
};

// Start routes here
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync();

    if (password.length < 5) {
      throw { message: "Password must be at least 5 characters long" };
    }

    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt),
    }).save();

    res.status(201).json({
      response: {
        userId: newUser._id,
        username: newUser.username,
        accessToken: newUser.accessToken,
      },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: {
          userId: user._id,
          username: user.username,
          accessToken: user.accessToken,
        },
        success: true,
      });
    } else {
      res.status(404).json({
        response: "Username or password doesn't match",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await ForumPost.find();
    const comments = await Comment.find();

    const postsWithComments = posts.map((post) => {
      const postComments = comments.filter((comment) => {
        return comment.postId === post._id.toString();
      });

      return {
        _id: post._id,
        title: post.title,
        message: post.message,
        userId: post.userId,
        createdAt: post.createdAt,
        posterName: post.posterName,
        comments: postComments,
      };
    });

    res.status(201).json({
      response: {
        posts: postsWithComments,
      },
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ response: error, success: false });
  }
});

app.post("/post/add", async (req, res) => {
  const { title, message, userId } = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    const post = await new ForumPost({
      message,
      title,
      userId,
      posterName: user.username,
      createdAt: new Date(),
    }).save();

    res.status(201).json({
      response: {
        postId: post._id,
      },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.delete("/post/remove", async (req, res) => {
  const { id } = req.body;

  try {
    const post = await ForumPost.deleteOne({ _id: id });

    res.status(201).json({
      response: {
        postId: post._id,
      },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.post("/comment/add", async (req, res) => {
  const { message, userId, postId } = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    const comment = await new Comment({
      message,
      postId,
      userId,
      posterName: user.username,
      createdAt: new Date(),
    }).save();

    res.status(201).json({
      response: {
        commentId: comment._id,
      },
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ response: error, success: false });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
