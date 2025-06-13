const mongoose = require("mongoose");
const slugify = require("slugify");

const eventoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, unique: true },
    slug: String,
    descrizione: String,
    immagineLogo: String,
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
eventoSchema.set("toJSON", {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.id;
    return ret;
  },
});

eventoSchema.index({ slug: 1 });
eventoSchema.virtual("edizioni", {
  ref: "Edizione",
  localField: "_id",
  foreignField: "evento",
  justOne: false,
  options: { select: "-_id -evento anno giorni" },
});

eventoSchema.pre("save", function(next) {
  this.slug = slugify(this.nome, { lower: true });
  next();
});
const Evento = mongoose.model("Evento", eventoSchema, "eventi");

module.exports = Evento;
