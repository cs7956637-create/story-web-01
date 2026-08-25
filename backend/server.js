import express from "express"
import bcrypt from "bcrypt"
import cors from "cors"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import dns from "dns"
import multer from "multer"
import dotenv from "dotenv";
dotenv.config();
const port=process.env.PORT || 8080;


const app= express()
app.use(express.json())
app.use(cors())
dns.setServers(["8.8.8.8","1.1.1.1"])
//mongoose connection
try {
    mongoose.connect(process.env.MONGO_URL)
    console.log("Mongoose connected sucessfully");
    //9jEU2Q7GPkr18wnm
    
} catch (error) {
    console.log("mongoose:",error);
}

//Shema connection
const upload=multer({
  storage:multer.memoryStorage()
})

const UserShema=new mongoose.Schema({
    name: String,
    password:String
})

//

const StroryShema=new mongoose.Schema({
title:String,
content:String,
image:{
    data:Buffer,
    contentType:String
}
})

const User=mongoose.model("User",UserShema)
const Document=mongoose.model("Document",StroryShema)





app.post("/signup",async(req,res)=>{
    const {name,password}=req.body
    const hashpsw=await bcrypt.hash(password,10)
    const user=await User.create({
        name,
        password:hashpsw
       

    })
    res.send({
        message:"user created successfully",
        user
    })
})

app.post("/login", async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).send({
      message: "Two fields are required"
    });
  }

  const user = await User.findOne({ name });

  if (!user) {
    return res.status(404).send({
      message: "User does not exist"
    });
  }

  const IsMatch = await bcrypt.compare(password, user.password);

  if (!IsMatch) {
    return res.status(401).send({
      message: "Invalid password"
    });
  }

  const token = jwt.sign(
    { userId: user._id },
     process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.send({
    message: "User login successfully",
    token
  });
});


const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token required"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};


// get profile

app.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "Profile fetched successfully",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
});

//story
app.post("/documents", authMiddleware,upload.single("image"), async (req, res) => {
  try {

    const document = await Document.create({
      title: req.body.title,
      content: req.body.content,

      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      }
    });

    res.status(201).json({
      message: "Document saved",
      document
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Save failed"
    });
  }
});

app.get("/documents/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found"
      });
    }

    res.status(200).json(document);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Fetch failed"
    });
  }
});
//getdata
app.get("/dataget",authMiddleware, async (req, res) => {
  try {
    const documets = await Document.find();

    const result = documets.map((doc) => ({
      _id: doc._id,
      title: doc.title,
      content: doc.content,

      image: doc.image?.data
        ? `data:${doc.image.contentType};base64,${doc.image.data.toString("base64")}`
        : null
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// app.get("/dataget", authMiddleware, async (req, res) => {
//   try {
//     const document = await Document.findOne({
//       user: req.user.id
//     }).sort({ createdAt: -1 });

//     if (!document) {
//       return res.status(404).json({
//         message: "No document found",
//       });
//     }

//     const result = {
//       _id: document._id,
//       title: document.title,
//       content: document.content,

//       image: document.image?.data
//         ? `data:${document.image.contentType};base64,${document.image.data.toString(
//             "base64"
//           )}`
//         : null,
//     };

//     res.json(result);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

//delete 
app.delete("/documents/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    console.log("DELETE ID:", id);

    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found"
      });
    }

    await Document.findByIdAndDelete(id);

    res.status(200).json({
      message: "Document deleted successfully"
    });

  } catch (error) {
    console.log("DELETE ERROR:", error);

    res.status(500).json({
      message: "Delete failed",
      error: error.message
    });
  }
});





app.listen(port,()=>{
    console.log(`Server running on ${port}`);
    
})