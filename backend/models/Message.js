import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
  message: {
    // SÄKERHETSBRIST (XSS/Injection): Meddelandefältet saknar validering och sanering av innehåll. Skadlig kod kan injiceras och lagras i databasen.
    // SÄKERHETSBRIST (BAC): Modellen saknar maxlength på meddelandefältet vilket innebär att extremt långa meddelanden kan skickas. Behörighetskontroll, dvs vem som får läsa, ändra eller ta bort ett meddelande, hanteras inte här utan måste implementeras i API-logiken.
    type: String,
    required: true
  },
  user: {
    // POSITIVT: Meddelandet är kopplat till en specifik användare via user-fältet, en bra grund för behörighetskontroll.
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const Message = mongoose.model("Message", messageSchema)
