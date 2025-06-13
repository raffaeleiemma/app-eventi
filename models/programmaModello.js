const mongoose = require("mongoose");

const programmaSchema = new mongoose.Schema(
  {
    edizione: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Edizione",
      required: [true, "Il programma deve appartenere a un'edizione"],
    },

    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Collegamento virtuale con gli interventi
programmaSchema.virtual("interventi", {
  ref: "Intervento",
  localField: "_id",
  foreignField: "programma",
  justOne: false,
});

const Programma = mongoose.model("Programma", programmaSchema);
module.exports = Programma;
