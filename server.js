const express = require("express");
const app = express();

app.use(express.json()); // ✅ Needed to parse JSON body

// POST API
app.post("/bfhl", (req, res) => {
  try {
    console.log("POST /bfhl received body:", req.body); // Debugging log

    const data = req.body.data;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input format. Expected { data: [ ... ] }"
      });
    }

    let evenNumbers = [];
    let oddNumbers = [];
    let alphabets = [];
    let specialChars = [];
    let sum = 0;

    data.forEach(item => {
      if (/^-?\d+$/.test(item)) {
        // Integer check
        let num = Number(item);
        if (num % 2 === 0) {
          evenNumbers.push(item); // keep as string
        } else {
          oddNumbers.push(item);
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        // Alphabet check
        alphabets.push(item.toUpperCase());
      } else {
        // Special characters
        specialChars.push(item);
      }
    });

    // Build concat string (reverse + alternating caps)
    let concatString = "";
    let joined = alphabets.join("");
    let reversed = joined.split("").reverse().join("");
    for (let i = 0; i < reversed.length; i++) {
      concatString += i % 2 === 0 
        ? reversed[i].toUpperCase() 
        : reversed[i].toLowerCase();
    }

    const response = {
      is_success: true,
      user_id: "archit_agarwal_15052005",  // replace with full name + DOB
      email: "archit.agarwal1505@gmail.com", // replace with VIT email
      roll_number: "22BCE2021", // replace with roll number
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialChars,
      sum: sum.toString(),
      concat_string: concatString
    };

    return res.status(200).json(response);

  } catch (err) {
    console.error("Error in /bfhl:", err); // log error
    return res.status(500).json({
      is_success: false,
      message: "Internal server error",
      error: err.message
    });
  }
});

// GET root route
app.get("/", (req, res) => {
  res.send("✅ API is running! Use POST /bfhl with JSON body { data: [...] }");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
