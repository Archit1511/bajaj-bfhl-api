const express = require("express");
const app = express();

app.use(express.json());

// POST API
app.post("/bfhl", (req, res) => {
  try {
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
        // It's an integer
        let num = Number(item);
        if (num % 2 === 0) {
          evenNumbers.push(item); // keep as string
        } else {
          oddNumbers.push(item);
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        // It's an alphabet/word
        alphabets.push(item.toUpperCase());
      } else {
        // Special character
        specialChars.push(item);
      }
    });

    // Build concat string: reverse alphabets and apply alternating caps
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
      user_id: "archit_agarwal_15052005",  // 👉 replace with your full name + DOB
      email: "archit.agarwal1505@gmail.com", // 👉 replace with your VIT email
      roll_number: "22BCE2021", // 👉 replace with your roll number
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialChars,
      sum: sum.toString(),
      concat_string: concatString
    };

    res.status(200).json(response);

  } catch (err) {
    res.status(500).json({
      is_success: false,
      message: "Internal server error",
      error: err.message
    });
  }
});

// Root GET route (so Render doesn’t show "Cannot GET /")
app.get("/", (req, res) => {
  res.send("✅ API is running! Use POST /bfhl");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
