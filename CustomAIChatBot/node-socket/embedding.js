
const express = require("express") 
const path = require("path") 
const multer = require("multer") 
const app = express() 

const fs = require("fs");
const { openai } = require("./utils/helper");
const pdfParse = require('pdf-parse');
// Config Variables

let embeddingStore = {}; // Contains embedded data for future use
const min_para_words = 5; // We will ignore paragraphs that have less than 5 words
const embeds_storage_prefix = "embeds:";

// Specify raw source file and embedded destination file path
//let sourcePath = "./sourceData/sourceFile.txt";
global.filepath1 = "abc";
let sourcePath = "./sourceData/";
let destPath = "./embeddedData/embeddingData.csv";

const generateEmbedding = async () => {
  // Reads the raw text file
  console.log("Embedding Started...");
  
  const rawText = fs.readFileSync(global.filepath1);
  
    try {
        const data = await pdfParse(rawText);
		//let rawParas1 = data.text.split(/\n\s*\n/);
		raw_pdf = data.text;

        // The content
        console.log('Content: ', data.text); 

        // Total page
        console.log('Total pages: ', data.numpages);

        // File information
        console.log('Info: ', data.info);
    }catch(err){
        throw new Error(err);
    }
  
  

  // Paragraph store after splitting
  let paras = [];

  // Split text into paragraphs
  let rawParas = raw_pdf.split(/\n\s*\n/);

  // Some more formatting and pushing each paragraph to paras[]
  for (let i = 0; i < rawParas.length; i++) {
    let rawPara = rawParas[i].trim().replaceAll("\n", " ").replace(/\r/g, "");

    // Check of it is a question and has greater length than minimum
    if (rawPara.charAt(rawPara.length - 1) != "?") {
      if (rawPara.split(/\s+/).length >= min_para_words) {
        paras.push(rawPara);
      }
    }
  }

  var countParas = paras.length;

  // Generate unix timestamp
  var startTime = new Date().getTime();

  // Sending data over to embedding model
  try {
    console.log("Sent file over to OpenAI 🚀");

    const response = await openai.createEmbedding({
      input: paras,
      model: "text-embedding-ada-002",
    });

    let completionTime = new Date().getTime();

    // Check if data recieved correctly
    if (response.data.data.length >= countParas) {
      for (let i = 0; i < countParas; i++) {
        // Adding each embedded para to embeddingStore
        embeddingStore[embeds_storage_prefix + paras[i]] = JSON.stringify({
          embedding: response.data.data[i].embedding,
          created: startTime,
        });
      }
    }

    // Write embeddingStore to destination file
    fs.writeFileSync(destPath, JSON.stringify(embeddingStore));

    console.log("Embedding finished ✨");
    console.log(`Time taken : ${(completionTime - startTime) / 1000} seconds`);
  } catch (error) {
    console.log("Some error happened");
    // Error handling code
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.log(error);
    }
  }
};
//////////////////////////////////////////////////////////////////
  
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}  
// View Engine Setup 
app.set("views",path.join(__dirname,"views")) 
app.set("view engine","ejs") 
    
// var upload = multer({ dest: "Upload_folder_name" }) 
// If you do not want to use diskStorage then uncomment it 
//file_name = filename;
	    
var storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
  
        // Uploads is the Upload_folder_name 
        //cb(null, "uploads") 
        cb(null, "sourceData") 
		
    }, 
    filename: function (req, file, cb) { 
	file_name = file.fieldname + "-" + Date.now()+".pdf";
	global.filepath1 = sourcePath + file_name;
      cb(null, file_name) 
	 // generateEmbedding(req)
      //cb(null, file.fieldname + "-" + Date.now()+".pdf") 
    }
	
	
  }) 
       
// Define the maximum size for uploading 
// file i.e. 50 MB. it is optional 
const maxSize = 50 * 1000 * 1000; 
    
var upload = multer({  
    storage: storage, 
    limits: { fileSize: maxSize }, 
    fileFilter: function (req, file, cb){ 
    
        // Set the filetypes, it is optional 
        var filetypes = /pdf/; 
        var mimetype = filetypes.test(file.mimetype); 
  
        var extname = filetypes.test(path.extname( 
                    file.originalname).toLowerCase()); 
        
        if (mimetype && extname) { 
            return cb(null, true); 
        } 
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes); 
      }  
  
// data1 is the name of file attribute 
}).single("myfile");        
  
app.get("/fileupload",function(req,res){ 
    res.render("file_upload"); 
}) 
    
app.post("/uploadData",async (req, res, next)=> { 
        
    // Error MiddleWare for multer file upload, so if any 
    // error occurs, the image would not be uploaded!
	//const newfile = await File.create	
	//await delay(3000);
    upload(req,res,function(err) { 
  
        if(err) { 
  
            // ERROR occurred (here it can be occurred due 
            // to uploading image of size greater than 
            // 50 MB or uploading different file type) 
            res.send(err) 
        } 
        else { 
  
            // SUCCESS, image successfully uploaded 
            res.send("Success, File Upload Successfull!") 
			console.log("sourcepath",global.filepath1);
			generateEmbedding();
			
			
        } 
    }
	)
			
}) 
    
// Take any port number of your choice which 
// is not taken by any other process 
app.listen(8080,function(error) { 
    if(error) throw error 
        console.log("Server created Successfully on PORT 8080") 
}) 