const mongoose = require("mongoose");
const slugify = require("slugify");

const edizioneSchema = new mongoose.Schema(
  {
    anno: Number,
    daGiorno: {
      type: Date,
      required: true,
    },

    aGiorno: {
      type: Date,
      required: true,
    },

    giorni: Number,
    nome: {
      type: String,

      trim: true,
    },
    evento: {
      type: mongoose.Schema.ObjectId,
      ref: "Evento",
      required: [true, "L'edizione deve essere associata a un evento."],
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
    stato: {
      type: String,
      enum: ["attiva", "completata", "annullata"],
      default: "attiva",
    },
    colore: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
edizioneSchema.set("toJSON", {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.id;
    return ret;
  },
});
edizioneSchema.pre("save", async function(next) {
  if (!this.daGiorno || !this.aGiorno) return next();

  if (this.daGiorno > this.aGiorno) {
    return next(
      new Error(
        "La data di fine evento non può essere inferiore alla data di inizio"
      )
    );
  }

  this.anno = this.daGiorno.getFullYear();

  const diffTime = this.aGiorno.getTime() - this.daGiorno.getTime();
  this.giorni = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  const existingEdizione = await Edizione.findOne({
    evento: this.evento,
    anno: this.anno,
    _id: { $ne: this._id },
  });

  if (existingEdizione) {
    return next(
      new Error(
        "Esiste già un'edizione per questo evento nell'anno specificato."
      )
    );
  }

  next();
});

const Edizione = mongoose.model("Edizione", edizioneSchema, "edizioni");

module.exports = Edizione;
