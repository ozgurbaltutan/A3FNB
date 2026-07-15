import { PRODUCT_CARD_IMAGE_OVERRIDES } from "@/content/product-card-assets";

export type ProductSelectionCriterion = {
  parameter: string;
  specification: string;
};

export type ProductDetailRecord = {
  id: string;
  title: string;
  cardTitle?: string;
  group: string;
  description: string;
  source: string;
  fit: string;
  selection: string;
  format: string;
  packing: string;
  documents?: string;
  image: string;
  imageAlt: string;
};

export type ProductDetailGroup = {
  id: string;
  title: string;
  description: string;
};

export type ProductCategoryDetail = {
  slug: string;
  heroText: [string, string];
  image: string;
  imageAlt: string;
  portfolioTitle: string;
  portfolioText: string;
  groups: ProductDetailGroup[];
  products: ProductDetailRecord[];
  context: {
    title: string;
    edition: string;
    items: { value: string; label?: string; description: string }[];
    sources: { label: string; href: string }[];
  };
  shipment: {
    title: string;
    text: string;
    items: { title: string; description: string }[];
    image: string;
    imageAlt: string;
  };
};

type ProductDetailRecordSource = Omit<ProductDetailRecord, "image" | "imageAlt"> & {
  image?: string;
  imageAlt?: string;
};

type ProductCategoryDetailSource = Omit<ProductCategoryDetail, "products" | "shipment"> & {
  products: ProductDetailRecordSource[];
  shipment: Omit<ProductCategoryDetail["shipment"], "image" | "imageAlt"> & {
    image?: string;
    imageAlt?: string;
  };
};

const codexStandards = "https://www.fao.org/fao-who-codexalimentarius/codex-texts/list-standards/en/";
const finalConfirmation = "Final specification and certificate of analysis confirmed with the commercial offer.";

function product(
  group: string,
  id: string,
  title: string,
  description: string,
  source: string,
  fit: string,
  selection: string,
  format: string,
  packing: string,
  extra: Partial<ProductDetailRecord> = {},
): ProductDetailRecordSource {
  return { group, id, title, description, source, fit, selection, format, packing, documents: finalConfirmation, ...extra };
}

const productCategoryDetailSources: Record<string, ProductCategoryDetailSource> = {
  "cocoa-products": {
    slug: "cocoa-products",
    heroText: [
      "Cocoa beans and processed cocoa ingredients organised by product form, cocoa characteristics, application, packing and origin.",
      "A3 reviews quality, certification, document and shipment requirements with the intended chocolate, bakery, beverage or industrial use in view.",
    ],
    image: "/media/home/featured-cocoa-card.png",
    imageAlt: "Cocoa ingredients for commercial food production",
    portfolioTitle: "Cocoa portfolio",
    portfolioText: "Cocoa beans, powder, butter and cocoa mass are reviewed as distinct commercial products with application-specific selection criteria.",
    groups: [
      { id: "primary", title: "Primary Cocoa", description: "Fermented and dried cocoa beans for processing or specialist programmes." },
      { id: "processed", title: "Processed Cocoa Ingredients", description: "Cocoa ingredients produced through grinding, pressing and further processing." },
    ],
    products: [
      product("primary", "cocoa-beans", "Cocoa Beans", "Fermented and dried cocoa beans reviewed by origin, grade, fermentation and buyer quality requirements.", "Selected origins by crop and availability", "Cocoa processing, trading and specialist origin programmes", "Origin, bean count, fermentation, moisture, defects and certification", "Whole fermented and dried beans", "Jute bags, lined bags or agreed bulk format"),
      product("processed", "cocoa-powder", "Cocoa Powder", "Natural or alkalised cocoa powder selected by colour, flavour, fat level and application.", "Selected processors and origins", "Bakery, beverages, desserts, dairy and confectionery", "Natural or alkalised, colour, pH, fat range and microbiological requirement", "Fine cocoa powder", "Multiwall paper bags with food-grade liner or agreed format"),
      product("processed", "cocoa-butter", "Cocoa Butter", "Cocoa butter reviewed by deodorisation, pressing route, quality profile and intended food application.", "Selected processors and origins", "Chocolate, confectionery and specialty fat applications", "Natural or deodorised, free fatty acids, melting profile and certification", "Blocks or liquid bulk, subject to route", "Cartons, lined blocks, drums or bulk"),
      product("processed", "cocoa-mass-liquor", "Cocoa Mass (Cocoa Liquor)", "Finely ground cocoa nib material; cocoa mass and cocoa liquor are trade names for the same core ingredient.", "Selected processors and origins", "Chocolate, compound coatings and industrial cocoa recipes", "Origin, roast profile, fineness, fat content and microbiological requirement", "Blocks, kibbled mass or liquid", "Lined cartons, bags or heated bulk where available"),
    ],
    context: {
      title: "Cocoa processing context",
      edition: "ICCO 2024/25 balance · May 2026 Quarterly Bulletin",
      items: [
        { value: "4.723", label: "million tonnes", description: "ICCO estimate of world cocoa bean production in 2024/25." },
        { value: "4.628", label: "million tonnes", description: "ICCO estimate of world cocoa grindings in 2024/25." },
        { value: "48", label: "thousand tonnes", description: "Estimated 2024/25 global cocoa supply surplus." },
      ],
      sources: [
        { label: "International Cocoa Organization — Processing Cocoa", href: "https://www.icco.org/processing-cocoa/" },
        { label: "International Cocoa Organization — Cocoa product FAQ", href: "https://www.icco.org/faq/" },
        { label: "ICCO Quarterly Bulletin", href: "https://www.icco.org/category/latest-news/" },
      ],
    },
    shipment: { title: "From requirement to cocoa supply", text: "Product form, recipe performance, food-safety controls and temperature-sensitive handling are aligned before offer.", items: [
      { title: "Ingredient definition", description: "Confirm beans, powder, butter or mass and the chocolate, bakery or beverage application." },
      { title: "Technical and sensory review", description: "Origin, fat level, colour, pH, roast, flavour and relevant Codex criteria are matched to the brief." },
      { title: "Format and handling", description: "Bags, blocks, drums or heated-bulk needs and route temperature controls are reviewed." },
      { title: "Approval and documents", description: "Sample approval, specification, COA, certification and destination documents are confirmed with the offer." },
    ] },
  },

  "dairy-milk-powders": {
    slug: "dairy-milk-powders",
    heroText: [
      "Milk powders, whey ingredients, dairy fats, cheese products and UHT milk organised by composition, functionality, packing and market requirements.",
      "A3 distinguishes Codex-recognised dairy products from formulated or analogue products and confirms final specifications with each offer.",
    ],
    image: "/media/home/featured-dairy-ingredients.webp",
    imageAlt: "Dairy ingredients and milk powders",
    portfolioTitle: "Dairy and milk powder portfolio",
    portfolioText: "Browse milk powders, whey and permeate ingredients, dairy fats, cheese routes and shelf-stable milk as separate product families.",
    groups: [
      { id: "milk-powders", title: "Milk Powders", description: "Dried milk products selected by composition, instant properties and application." },
      { id: "whey", title: "Whey, Lactose & Permeate", description: "Dairy ingredients with distinct protein, mineral and lactose profiles." },
      { id: "dairy-products", title: "Dairy Products", description: "Butter, cheese products and UHT milk for foodservice, manufacturing or retail." },
    ],
    products: [
      product("milk-powders", "whole-milk-powder", "Whole Milk Powder", "Milk powder retaining milk fat for dairy, beverage and food applications.", "Approved dairy origins by requirement", "Dairy, bakery, beverages and confectionery", "Milk fat, protein, moisture, heat class, solubility and microbiology", "Regular whole milk powder", "Multiwall bags with food-grade liner or big bags"),
      product("milk-powders", "skimmed-milk-powder", "Skimmed Milk Powder", "Low-fat milk powder selected by protein, heat treatment and functional use.", "Approved dairy origins by requirement", "Bakery, beverages, dairy and prepared foods", "Protein, moisture, heat class, scorched particles, solubility and microbiology", "Low-fat milk powder", "Multiwall bags with food-grade liner or big bags"),
      product("milk-powders", "instant-milk-powder", "Instant Milk Powder", "Agglomerated milk powder designed for improved wetting and dispersibility during reconstitution.", "Approved dairy origins by requirement", "Consumer reconstitution and beverage mixes", "Whole or skim base, instantisation, wettability, dispersibility and lecithination", "Agglomerated instant powder", "Retail packs or lined industrial bags"),
      product("milk-powders", "fat-filled-milk-powder", "Fat-Filled Milk Powder", "A formulated powder combining dairy solids with specified vegetable fat for targeted cost and functionality.", "Approved ingredient processors", "Beverages, bakery and formulated foods", "Protein source, vegetable fat type and level, solubility, flavour and application", "Formulated dairy/vegetable-fat powder", "Lined bags or big bags"),
      product("whey", "whey-powder", "Whey Powder", "Powder produced by drying sweet whey or acid whey, selected according to composition and use.", "Approved dairy origins by requirement", "Bakery, confectionery, seasoning and food manufacture", "Sweet or acid whey, lactose, protein, ash, moisture and microbiology", "Sweet whey or acid whey powder", "Lined multiwall bags or big bags"),
      product("whey", "lactose", "Lactose", "Crystalline milk sugar selected by mesh, purity and application.", "Approved dairy ingredient producers", "Food, infant nutrition subject to approval, confectionery and pharmaceutical-adjacent uses", "Monohydrate or anhydrous form, purity, mesh and microbiology", "Crystalline powder", "Lined bags or drums by grade"),
      product("whey", "dairy-whey-permeate", "Dairy / Whey Permeate Powder", "High-lactose dairy solids remaining after membrane removal of protein and fat to defined levels.", "Approved dairy ingredient producers", "Bakery, confectionery, seasoning and dairy formulations", "Dairy or whey source, lactose, ash, protein, moisture and mineral profile", "Spray-dried permeate powder", "Lined bags or big bags"),
      product("dairy-products", "butter", "Butter", "Milk-fat product reviewed by salted status, fat level, format and cold-chain route.", "Approved dairy origins by requirement", "Bakery, foodservice, retail and manufacturing", "Salted or unsalted, milk fat, moisture, format and microbiology", "Blocks, sheets or retail portions", "Cartons under controlled temperature"),
      product("dairy-products", "cheese", "Cheese", "Natural cheese selected by variety, maturity, fat and moisture profile, format and application.", "Approved dairy origins by requirement", "Retail, foodservice, bakery and prepared foods", "Variety, maturity, composition, melt or slice performance and format", "Blocks, loaves, slices, shreds or portions", "Vacuum packs, bags or cartons under cold chain"),
      product("dairy-products", "cheese-analogues", "Cheese Analogues", "Formulated cheese-like products using dairy and/or vegetable-fat systems for defined functional performance.", "Approved specialist producers", "Pizza, bakery, foodservice and prepared foods", "Dairy content, fat system, melt, stretch, browning, shred and flavour", "Blocks, loaves, slices or shreds", "Bags or cartons under controlled temperature"),
      product("dairy-products", "uht-milk", "UHT Milk", "Shelf-stable milk processed at ultra-high temperature and packed aseptically.", "Approved dairy origins by requirement", "Retail, wholesale and foodservice", "Fat level, fortification if any, pack size, shelf life and destination labelling", "Whole, semi-skimmed or skimmed liquid milk", "Aseptic retail cartons in shipping cases"),
    ],
    context: {
      title: "Dairy category context",
      edition: "FAO/WHO Codex dairy terminology · reviewed July 2026",
      items: [
        { value: "26–42%", label: "milk fat", description: "Codex composition range for whole milk powder." },
        { value: "1.5%", label: "maximum milk fat", description: "Codex limit for skimmed milk powder." },
        { value: "5%", label: "maximum water", description: "Codex limit for whole and skimmed milk powders." },
      ],
      sources: [
        { label: "FAO dairy products — Codex Alimentarius", href: "https://www.fao.org/dairy-production-products/products/codex-alimentarius/en" },
        { label: "Codex Standard for Whey Powders", href: "https://www.fao.org/input/download/standards/184/CXS_289e.pdf" },
      ],
    },
    shipment: { title: "From composition to dairy supply", text: "Composition, food-safety documents, packing and ambient or cold-chain requirements are confirmed before dairy supply progresses.", items: [
      { title: "Composition and application", description: "Define fat, protein, heat class, instant properties or finished-product performance." },
      { title: "Plant and quality approval", description: "Producer eligibility, microbiology, allergen status, specification and certificates are reviewed." },
      { title: "Pack and temperature route", description: "Industrial or retail packing and ambient, chilled or frozen handling are matched to shelf life." },
      { title: "Release documentation", description: "COA, health certificate, origin and destination-specific dairy documents are confirmed." },
    ] },
  },

  "oils-fats": {
    slug: "oils-fats",
    heroText: [
      "Edible oils, palm fractions, margarines and application-specific fats organised by source, refining, functionality and packing.",
      "A3 reviews oil identity, processing route, intended use, certification and destination-market requirements before quotation.",
    ],
    image: "/media/home/featured-edible-oils-fats.webp",
    imageAlt: "Edible oils and specialty fats",
    portfolioTitle: "Fats and oils portfolio",
    portfolioText: "Vegetable oils are separated from formulated and specialty fats so identity, function and handling are clear.",
    groups: [
      { id: "oils", title: "Edible Oils", description: "Named vegetable oils and palm fractions for retail, foodservice and industry." },
      { id: "fats", title: "Margarines & Functional Fats", description: "Formulated fats selected by plasticity, melting and application performance." },
    ],
    products: [
      product("oils", "sunflower-oil", "Sunflower Oil", "Sunflowerseed oil reviewed as crude or refined, with high-oleic options where required.", "Selected origins by crop and refinery availability", "Retail, foodservice, frying and manufacturing", "Crude or refined, standard or high oleic, fatty-acid profile, colour and oxidation controls", "Liquid vegetable oil", "PET, tins, jerrycans, drums, flexitank or bulk"),
      product("oils", "corn-maize-oil", "Corn / Maize Oil", "Oil derived from maize germ and selected by refining status and intended use.", "Selected origins and refineries", "Retail, foodservice and food manufacturing", "Crude or refined, fatty-acid profile, colour, flavour and oxidation controls", "Liquid vegetable oil", "Retail packs, drums, flexitank or bulk"),
      product("oils", "olive-oil", "Olive Oil", "Olive oil reviewed by recognised grade, sensory and analytical profile, origin and pack format.", "Selected olive-producing origins", "Retail, foodservice and manufacturing", "Virgin category or refined blend, acidity and other grade criteria, origin and sensory profile", "Liquid olive oil", "Glass, PET, tins, drums or bulk"),
      product("oils", "palm-oil", "Palm Oil", "Edible palm oil reviewed separately from its liquid fraction, palm olein.", "Selected origins and refineries", "Food manufacturing and fat formulation", "Crude or refined, fractionation status, melting profile, colour and certification", "Semi-solid palm oil", "Drums, cartons, flexitank or bulk"),
      product("oils", "palm-olein", "Palm Olein", "The liquid fraction obtained from palm oil fractionation, used where liquid handling and frying performance are required.", "Selected origins and refineries", "Frying, foodservice and liquid-oil applications", "Iodine value or olein grade, cloud point, colour, oxidation controls and certification", "Liquid palm fraction", "PET, jerrycans, drums, flexitank or bulk"),
      product("fats", "margarines", "Margarines", "Water-in-oil emulsions selected by fat content, plasticity, flavour and channel.", "Approved fat and margarine producers", "Retail, foodservice, cooking and baking", "Fat content, salt, melting behaviour, plasticity, flavour and pack format", "Table, cooking or industrial margarine", "Retail tubs/bricks, sheets, blocks or cartons"),
      product("fats", "bakery-pastry-fats", "Bakery & Pastry Fats", "Application fats developed for lamination, creaming, shortening or filling performance.", "Approved specialist producers", "Bread, pastry, laminated dough, cakes and fillings", "Application, solid-fat profile, plasticity, melting, aeration and temperature performance", "Blocks, sheets or shortenings", "Lined cartons, sheets or pails"),
      product("fats", "specialty-fats", "Specialty Fats", "Tailored fat systems selected for confectionery, coating, filling or dairy-alternative functionality.", "Approved specialist producers", "Confectionery, coatings, fillings and dairy alternatives", "Application, compatibility, melting curve, crystallisation, lauric/non-lauric system and certification", "Blocks, flakes or liquid", "Lined cartons, bags, drums or bulk"),
    ],
    context: {
      title: "Fats and oils context",
      edition: "USDA FAS 2026/27 forecast · published June 2026",
      items: [
        { value: "244.13", label: "million tonnes", description: "Forecast production of major vegetable oils in 2026/27." },
        { value: "81.36", label: "million tonnes", description: "Forecast palm oil production in 2026/27." },
        { value: "23.51", label: "million tonnes", description: "Forecast sunflower oil production in 2026/27." },
      ],
      sources: [
        { label: "Codex Standard for Named Vegetable Oils", href: "https://www.fao.org/4/y2774e/y2774e04.htm" },
        { label: "USDA FAS Oilseeds: World Markets and Trade", href: "https://apps.fas.usda.gov/psdonline/circulars/oilseeds.pdf" },
        { label: "Codex General Standard for Fats and Oils", href: "https://www.fao.org/4/y2774e/y2774e03.htm" },
      ],
    },
    shipment: { title: "From oil profile to delivery", text: "Oil identity, refining status, functional performance and temperature-compatible logistics define the supply route.", items: [
      { title: "Oil or fat definition", description: "Confirm named oil, palm fraction, margarine recipe or application-specific fat system." },
      { title: "Quality and functionality", description: "FFA, peroxide value, identity profile, melting or cloud-point targets and certifications are reviewed." },
      { title: "Pack and temperature plan", description: "Retail packs, drums, IBC, flexitank or heated bulk are matched to product behaviour and route." },
      { title: "Tank and document control", description: "Previous cargo, cleanliness, COA, origin and destination documents are confirmed before dispatch." },
    ] },
  },

  "starches-sweeteners": {
    slug: "starches-sweeteners",
    heroText: [
      "Starches, plant proteins, carbohydrate ingredients, polyols and specialty sweeteners organised by function and application.",
      "A3 starts with the required process performance—thickening, binding, bulking, sweetness, humectancy or protein enrichment—then confirms the product specification.",
    ],
    image: "/media/home/featured-starches-industrial.webp",
    imageAlt: "Starches and functional sweetener ingredients",
    portfolioTitle: "Starches, sweeteners and functional ingredients",
    portfolioText: "The range is grouped by technical role so similarly named ingredients are not treated as interchangeable.",
    groups: [
      { id: "starches", title: "Native & Modified Starches", description: "Botanical-source starches and modified systems for texture and process stability." },
      { id: "proteins", title: "Plant Proteins & Functional Ingredients", description: "Wheat gluten and pea protein for structure and protein enrichment." },
      { id: "carbohydrates", title: "Syrups & Carbohydrate Ingredients", description: "Glucose/fructose syrups, maltodextrin and crystalline dextrose." },
      { id: "polyols", title: "Polyols & Humectants", description: "Sugar alcohols and glycerol selected by sweetness, humectancy and process role." },
      { id: "specialty", title: "Specialty Sweeteners", description: "Allulose and stevia ingredients requiring market and formulation review." },
    ],
    products: [
      product("starches", "corn-starch", "Corn Starch", "Native maize starch for thickening, binding and dry-mix applications.", "Selected starch producers", "Sauces, bakery, dairy, confectionery and dry mixes", "Native grade, viscosity, moisture, pH, microbiology and GMO status where relevant", "Fine white powder", "Lined bags or big bags"),
      product("starches", "tapioca-starch", "Tapioca Starch", "Cassava-derived starch valued for neutral flavour and characteristic texture.", "Selected cassava-producing origins", "Sauces, bakery, noodles, snacks and gluten-free formulations", "Native grade, viscosity, whiteness, moisture and microbiology", "Fine powder", "Lined bags or big bags"),
      product("starches", "wheat-starch", "Wheat Starch", "Starch separated from wheat flour and selected by purity and functional performance.", "Selected wheat processors", "Bakery, coatings, confectionery and prepared foods", "Native grade, residual protein, viscosity, moisture and allergen controls", "Fine powder", "Lined bags or big bags"),
      product("starches", "potato-starch", "Potato Starch", "High-swelling tuber starch for viscosity and texture applications.", "Selected potato-processing origins", "Soups, sauces, noodles, snacks and meat applications", "Viscosity, moisture, granulation, microbiology and application stability", "Fine powder", "Lined bags or big bags"),
      product("starches", "rice-starch", "Rice Starch", "Fine-granule starch used where smooth texture and neutral profile are important.", "Selected rice processors", "Dairy, desserts, sauces, bakery and specialised formulations", "Granule/fineness profile, purity, moisture and microbiology", "Fine powder", "Lined bags"),
      product("starches", "pea-starch", "Pea Starch", "Pulse-derived starch selected for texture, binding and clean-label positioning.", "Selected pea processors", "Noodles, snacks, prepared foods and gluten-free formulations", "Native grade, viscosity, protein residue, moisture and microbiology", "Fine powder", "Lined bags or big bags"),
      product("starches", "modified-starches", "Modified Starches", "Starches modified to deliver stability under heat, shear, acid, freezing or storage conditions.", "Approved specialist starch producers", "Sauces, dairy, frozen foods, bakery and prepared meals", "Botanical base, modification, process conditions, viscosity target and label requirement", "Application-specific powder", "Lined bags or big bags"),
      product("proteins", "vital-wheat-gluten", "Vital Wheat Gluten", "Concentrated wheat protein used for dough strength, structure and protein enrichment.", "Selected wheat protein producers", "Bread, bakery, meat alternatives and protein enrichment", "Protein, water absorption, elasticity, moisture and microbiology", "Fine protein powder", "Lined bags or big bags"),
      product("proteins", "pea-protein", "Pea Protein", "Pulse protein ingredient selected by concentration, flavour and functional performance.", "Selected pea protein producers", "Plant-based foods, bakery, beverages and nutrition formulations", "Protein concentration, isolate/concentrate, solubility, flavour and microbiology", "Fine protein powder", "Lined bags"),
      product("carbohydrates", "glucose-syrup", "Glucose Syrup", "Purified aqueous starch hydrolysate selected by dextrose equivalent and solids.", "Selected starch sweetener producers", "Confectionery, bakery, beverages and processed foods", "DE, dry solids, carbohydrate profile, viscosity and application", "Liquid syrup", "Drums, IBC or bulk tanker"),
      product("carbohydrates", "fructose-syrup", "Fructose Syrup", "Glucose-fructose syrup selected by fructose content, solids and sweetness target.", "Selected starch sweetener producers", "Beverages and food manufacturing", "Fructose content, dry solids, carbohydrate profile and application", "Liquid syrup", "Drums, IBC or bulk tanker"),
      product("carbohydrates", "maltodextrin", "Maltodextrin", "Low-DE starch hydrolysate used for bulking, carrier and body.", "Selected starch ingredient producers", "Beverages, flavours, dry mixes, nutrition and processed foods", "DE range, botanical source, solubility, bulk density and application", "Spray-dried powder", "Lined bags or big bags"),
      product("carbohydrates", "dextrose-monohydrate", "Dextrose Monohydrate", "Crystalline D-glucose containing water of crystallisation.", "Selected starch sweetener producers", "Bakery, confectionery, beverages and fermentation", "Monohydrate form, purity, mesh, moisture and microbiology", "Crystalline powder", "Lined bags or big bags"),
      product("carbohydrates", "dextrose-anhydrous", "Dextrose Anhydrous", "Purified crystalline D-glucose without water of crystallisation.", "Selected starch sweetener producers", "Dry mixes, beverages, confectionery and controlled-moisture formulations", "Anhydrous form, purity, mesh, moisture and microbiology", "Crystalline powder", "Lined bags or drums by grade"),
      product("polyols", "sorbitol", "Sorbitol", "Polyol used for sweetness, humectancy and texture in liquid or crystalline form.", "Approved polyol producers", "Confectionery, bakery, oral care and food applications", "Solution or powder, assay, solids, reducing sugars and application", "Liquid solution or crystalline powder", "Bags, drums, IBC or bulk"),
      product("polyols", "maltitol", "Maltitol", "Polyol sweetener selected as syrup or crystalline product for sugar-reduced applications.", "Approved polyol producers", "Sugar-free confectionery, bakery and coatings", "Syrup or crystalline, assay, solids, sweetness and process performance", "Liquid syrup or crystalline powder", "Bags, drums, IBC or bulk"),
      product("polyols", "xylitol", "Xylitol", "Crystalline polyol with sweetness close to sucrose for specialised formulations.", "Approved polyol producers", "Confectionery, chewing gum, oral care and tabletop products", "Assay, particle size, moisture, source and microbiology", "Crystalline powder", "Lined bags or drums"),
      product("polyols", "erythritol", "Erythritol", "Low-calorie crystalline polyol used for bulk and sweetness adjustment.", "Approved fermentation-based producers", "Beverages, confectionery, bakery and tabletop blends", "Assay, mesh, moisture, fermentation source and application", "Crystalline powder", "Lined bags"),
      product("polyols", "glycerol", "Glycerol", "Food-grade glycerol used primarily as a humectant, solvent and texture-management ingredient.", "Approved food-grade producers", "Bakery, confectionery, flavours and moisture control", "Food grade, assay, water, colour, source and identity preservation where required", "Viscous liquid", "Drums, IBC or bulk"),
      product("specialty", "allulose", "Allulose", "Rare sugar ingredient requiring destination-market approval and application review.", "Approved specialist producers", "Reduced-sugar beverages, bakery and confectionery where permitted", "Assay, source, particle size or syrup solids, application and regulatory status", "Crystalline powder or syrup", "Lined bags, drums or IBC"),
      product("specialty", "stevia", "Stevia", "High-intensity sweetener ingredient based on specified steviol glycoside composition.", "Approved stevia extract producers", "Beverages, dairy, tabletop blends and reduced-sugar foods", "Steviol glycoside profile, assay, taste target, solubility and destination approval", "High-intensity powder or formulated blend", "Lined bags, cartons or drums"),
    ],
    context: {
      title: "Ingredient classification context",
      edition: "Codex sugar and ingredient terminology · reviewed July 2026",
      items: [
        { value: "20", label: "minimum DE", description: "Codex definition threshold for glucose syrup." },
        { value: "70%", label: "minimum dry matter", description: "Codex minimum solids content for glucose syrup." },
        { value: "99.5%", label: "D-glucose, dry basis", description: "Codex minimum for dextrose monohydrate and dextrose anhydrous." },
      ],
      sources: [
        { label: "Codex Standard for Sugars", href: "https://www.fao.org/fao-who-codexalimentarius/sh-proxy/en/?lnk=1&url=https%3A%2F%2Fworkspace.fao.org%2Fsites%2Fcodex%2FStandards%2FCXS%2B212-1999%2FCXS_212e.pdf" },
        { label: "Codex Standard for Wheat Protein Products", href: codexStandards },
      ],
    },
    shipment: { title: "From formulation brief to ingredient supply", text: "The functional target, process conditions, regulatory fit, packing and supplier specification are aligned before ingredient selection.", items: [
      { title: "Function and process", description: "Define sweetness, viscosity, stability, protein function, dosage and processing conditions." },
      { title: "Sample and application review", description: "Botanical source, DE, assay, functional tests and a sample are matched to the formulation." },
      { title: "Regulatory and pack check", description: "Additive status, allergen declarations, destination permissions and powder or liquid logistics are reviewed." },
      { title: "Specification lock", description: "Approved grade, final specification, COA and packing are tied to the commercial offer." },
    ] },
  },

  "dried-fruit-nuts": {
    slug: "dried-fruit-nuts",
    heroText: [
      "Dried fruits and tree nuts organised by origin, crop, grade, size, processing format, packing and application.",
      "A3 reviews moisture, defects, treatment, allergen controls, certificates and destination requirements against each enquiry.",
    ],
    image: "/media/home/product-dried-fruit-nuts.webp",
    imageAlt: "Dried fruit and nut products",
    portfolioTitle: "Dried fruit and nuts portfolio",
    portfolioText: "Individual fruit and nut routes are kept separate so crop, grade, size and processing requirements can be stated clearly.",
    groups: [
      { id: "dried-fruit", title: "Dried Fruit", description: "Fruit selected by variety, crop, grade, moisture and processing format." },
      { id: "nuts", title: "Nuts", description: "Pistachio and walnut products selected by size, shell/kernel format and grade." },
    ],
    products: [
      product("dried-fruit", "raisins-sultanas", "Raisins & Sultanas", "Dried grapes selected by variety, colour, size, treatment and application.", "Selected producing origins by crop", "Bakery, cereals, retail and snacking", "Variety, grade, berry count/size, colour, moisture, oil treatment and defects", "Natural or treated dried grapes", "Cartons or lined bags"),
      product("dried-fruit", "dried-apricots", "Dried Apricots", "Whole, halved or diced apricots selected by size, colour, sulphur status and moisture.", "Selected producing origins by crop", "Retail, snacking, bakery and food manufacture", "Size, colour, sulphured or natural, moisture, defects and format", "Whole, halves, diced or paste", "Cartons or lined bags"),
      product("dried-fruit", "dates", "Dates", "Dates reviewed by variety, size, moisture, pit status and intended channel.", "Selected date-producing origins", "Retail, foodservice, bakery and ingredients", "Variety, pitted/unpitted, size, moisture, defects and crop", "Whole, pitted, chopped or paste", "Retail packs, cartons or bulk cases"),
      product("dried-fruit", "dried-figs", "Dried Figs", "Dried figs selected by variety, size, grade, moisture and processing format.", "Selected fig-producing origins by crop", "Retail, bakery, snacking and ingredients", "Variety, size, grade, moisture, defects and aflatoxin controls", "Whole, diced or paste", "Cartons or lined bags"),
      product("nuts", "in-shell-pistachios", "In-Shell Pistachios", "Pistachios supplied in shell and selected by origin, size, opening and defect profile.", "Selected pistachio origins by crop", "Retail, roasting and snacking", "Size count, naturally/opened status, closed shells, defects, moisture and aflatoxin controls", "Raw or roasted in-shell nuts", "Vacuum bags, cartons or sacks"),
      product("nuts", "pistachio-kernels", "Pistachio Kernels", "Shelled pistachio kernels selected by colour, size, whole/piece format and application.", "Selected pistachio origins by crop", "Bakery, confectionery, gelato and ingredients", "Whole/pieces, colour, size, defects, moisture and aflatoxin controls", "Raw, roasted, whole, pieces or meal", "Vacuum bags or lined cartons"),
      product("nuts", "walnuts", "Walnuts", "In-shell or kernel walnuts selected by variety, size, colour and kernel condition.", "Selected walnut origins by crop", "Retail, bakery, confectionery and snacking", "In-shell/kernel, halves/pieces, colour, size, moisture and defects", "In-shell, halves, quarters or pieces", "Vacuum bags, cartons or sacks"),
    ],
    context: {
      title: "Dried fruit and nut context",
      edition: "UNECE commercial quality standards · reviewed July 2026",
      items: [
        { value: "3", label: "quality classes", description: "UNECE dry-produce standards use Extra, Class I and Class II where applicable." },
        { value: "26%", label: "maximum moisture", description: "UNECE date limit for cane-sugar varieties; invert-sugar varieties may reach 30%." },
        { value: "4 g", label: "minimum fruit weight", description: "UNECE minimum weight for a date, subject to the standard's sizing provisions." },
      ],
      sources: [{ label: "UNECE Dry and Dried Produce Standards", href: "https://unece.org/trade/wp7/DDP-Standards" }],
    },
    shipment: { title: "From crop selection to packed supply", text: "Crop, grade, food-safety controls and protective packing are reviewed for each dried fruit and nut product.", items: [
      { title: "Crop, variety and format", description: "Define origin, crop, size, class, whole/piece format and treatment status." },
      { title: "Quality and contaminant plan", description: "Moisture, defects, foreign matter, residues and aflatoxin controls are reviewed as applicable." },
      { title: "Sample and packing approval", description: "Representative sample, vacuum or lined packing, carton and pallet configuration are agreed." },
      { title: "Crop documents and dispatch", description: "Specification, COA, phytosanitary, origin and destination documents are confirmed." },
    ] },
  },

  "frozen-foods": {
    slug: "frozen-foods",
    heroText: [
      "Frozen potato, poultry, seafood, fruit, vegetable and bakery products organised by format, channel, packing and cold-chain needs.",
      "A3 reviews product specification, producer approvals, storage temperature, shelf life, destination documents and reefer routing before quotation.",
    ],
    image: "/media/home/featured-frozen-foods.webp",
    imageAlt: "Frozen food products for foodservice and retail",
    portfolioTitle: "Frozen food portfolio",
    portfolioText: "Product families are separated by processing, regulatory and cold-chain requirements.",
    groups: [
      { id: "potato-produce", title: "Frozen Potato, Fruit & Vegetables", description: "Plant-based frozen foods reviewed by cut, process and pack format." },
      { id: "protein", title: "Frozen Poultry & Seafood", description: "Animal-protein products requiring species/cut definition, approvals and strict cold chain." },
      { id: "bakery", title: "Frozen Pastry & Bakery", description: "Ready-to-bake, part-baked and finished products for foodservice and retail." },
    ],
    products: [
      product("potato-produce", "french-fries", "French Fries / Frozen Potato Products", "Frozen potato products selected by cut, coating, solids, fry performance and channel.", "Approved frozen potato processors", "Foodservice, quick service, retail and distribution", "Cut, coating, potato solids, fry time, holding performance and pack size", "Fries, wedges, hash browns or formed products", "Foodservice or retail bags in cartons"),
      product("potato-produce", "frozen-fruit-vegetables", "Frozen Fruit & Vegetables", "IQF or block-frozen produce selected by variety, cut, grade and intended application.", "Approved fruit and vegetable processors", "Retail, foodservice, bakery, beverages and manufacturing", "Species/variety, cut, IQF/block, size, defects, microbiology and residue requirements", "IQF, block, puree or pieces", "Retail or industrial bags in cartons"),
      product("protein", "frozen-poultry", "Frozen Poultry", "Poultry products defined by species, cut, processing, certification and destination approval.", "Approved poultry establishments by market", "Foodservice, retail, wholesale and processing", "Species, cut, bone/skin status, processing, glaze if relevant, halal and establishment approval", "Whole birds, cuts, boneless meat or processed items", "Food-grade bags and export cartons"),
      product("protein", "frozen-seafood", "Frozen Seafood", "Seafood selected by species, scientific name, origin, catch/farm method, size and processing format.", "Approved fisheries and processors by market", "Foodservice, retail, wholesale and processing", "Species/scientific name, wild/farmed, size, treatment, glaze, processing and establishment approval", "Whole, fillet, portion, block or value-added", "Food-grade bags and export cartons"),
      product("bakery", "frozen-pastry-bakery", "Frozen Pastry & Bakery Products", "Frozen dough, pastry and bakery items selected by preparation method and channel performance.", "Approved bakery producers", "Foodservice, retail, hospitality and distribution", "Product type, ready-to-bake/part-baked status, proofing, bake method, allergens and shelf life", "Dough, laminated pastry, part-baked or finished", "Inner packs or trays in frozen cartons"),
    ],
    context: {
      title: "Frozen food handling context",
      edition: "Codex quick-frozen food standards · reviewed July 2026",
      items: [
        { value: "−18°C", label: "or colder", description: "Codex reference temperature for quick-frozen foods through distribution." },
        { value: "2", label: "produce formats", description: "IQF and block-frozen formats require different handling and portioning plans." },
        { value: "3", label: "route controls", description: "Product approval, remaining shelf life and cold-chain continuity must align." },
      ],
      sources: [{ label: "Codex quick-frozen food and fish standards", href: codexStandards }],
    },
    shipment: {
      title: "Cold-chain supply review",
      text: "Frozen supply depends on a continuous temperature-controlled route, approved product documentation and compatible pack formats.",
      items: [
        { title: "Product and establishment", description: "Define species, cut or product format and any destination establishment approvals." },
        { title: "Temperature and shelf life", description: "Storage temperature, remaining shelf life and handling expectations are confirmed." },
        { title: "Packing and reefer route", description: "Carton configuration, pallet plan, volume, port and reefer availability are reviewed together." },
        { title: "Documents and follow-through", description: "Health, origin, catch or processing documents are checked as applicable before shipment." },
      ],
    },
  },

  "consumer-foods": {
    slug: "consumer-foods",
    heroText: [
      "Shelf-stable consumer and foodservice products organised by recipe category, pack format, brand/private-label route and destination market.",
      "A3 reviews formulation, shelf life, labels, carton configuration, channel fit and export documents before a programme moves forward.",
    ],
    image: "/media/home/featured-consumer-foods.webp",
    imageAlt: "Packaged consumer food products",
    portfolioTitle: "Consumer foods portfolio",
    portfolioText: "Sauces, canned products, pasta and tomato paste are presented as distinct commercial families with channel-specific criteria.",
    groups: [
      { id: "sauces", title: "Sauces & Condiments", description: "Ketchup and mayonnaise kept separate according to their product systems." },
      { id: "shelf-stable", title: "Shelf-Stable Foods", description: "Canned foods, pasta and tomato paste for retail, foodservice and manufacturing." },
    ],
    products: [
      product("sauces", "ketchup", "Ketchup", "Tomato-based non-emulsified sauce selected by recipe, solids, pack and channel.", "Approved sauce producers", "Retail, foodservice and private label", "Tomato solids/Brix, recipe, viscosity, preservatives where permitted, shelf life and label", "Non-emulsified tomato sauce", "Sachets, bottles, pouches, jars or foodservice packs"),
      product("sauces", "mayonnaise", "Mayonnaise", "Emulsified sauce selected by oil level, egg system, recipe, viscosity and pack format.", "Approved sauce producers", "Retail, foodservice and private label", "Oil level, egg source, emulsion stability, recipe, shelf life, allergens and label", "Emulsified sauce", "Sachets, jars, bottles, pouches or foodservice packs"),
      product("shelf-stable", "canned-foods", "Canned Foods", "Heat-processed shelf-stable foods selected by product, medium, can size and channel.", "Approved canning producers", "Retail, wholesale, institutional and foodservice", "Product, drained weight where relevant, packing medium, can format, thermal process and shelf life", "Canned vegetables, pulses, fruit or prepared foods by enquiry", "Cans or jars in shipping cartons"),
      product("shelf-stable", "pasta", "Pasta", "Dry pasta selected by wheat/semolina base, shape, cooking performance and pack format.", "Approved pasta producers", "Retail, foodservice, wholesale and private label", "Durum/recipe basis, shape, cooking time, breakage, protein and label", "Short, long or speciality dry pasta", "Retail bags/boxes or foodservice sacks"),
      product("shelf-stable", "tomato-paste", "Tomato Paste", "Concentrated tomato product selected by soluble solids, process and industrial or retail pack.", "Approved tomato processors", "Sauce manufacture, foodservice, retail and industrial use", "Brix/soluble solids, hot or cold break, colour, viscosity, acidity and microbiology", "Concentrated tomato paste", "Aseptic bags in drums/bins, cans, jars or sachets"),
    ],
    context: {
      title: "Consumer food category context",
      edition: "Codex food categorisation · reviewed July 2026",
      items: [
        { value: "24%", label: "minimum soluble solids", description: "Codex threshold at which processed tomato concentrate is designated tomato paste." },
        { value: "7–24%", label: "soluble solids", description: "Codex range for tomato purée, with 24% excluded." },
        { value: "<4.6", label: "pH", description: "Codex requirement for processed tomato concentrates." },
      ],
      sources: [
        { label: "Codex General Standard for Food Additives — food categories", href: "https://www.fao.org/4/X7137E/x7137e1v.htm" },
        { label: "Codex commodity standards", href: codexStandards },
      ],
    },
    shipment: {
      title: "Packing and market fit",
      text: "Pack size, shelf life, label language, carton configuration and destination-market requirements define the workable route.",
      items: [
        { title: "Product and recipe", description: "Confirm the exact product, recipe or performance target and applicable allergens." },
        { title: "Brand and label route", description: "Define branded or private-label supply, languages, claims and destination requirements." },
        { title: "Pack and carton", description: "Share unit size, material, case count, pallet needs, volume and channel." },
        { title: "Shelf life and documents", description: "Remaining shelf life, specifications and export documents are checked before quotation." },
      ],
    },
  },
};

export const productCategoryDetails: Record<string, ProductCategoryDetail> = Object.fromEntries(
  Object.entries(productCategoryDetailSources).map(([slug, detail]) => [
    slug,
    {
      ...detail,
      image: detail.image ?? `/media/products/${slug}/hero-v2.webp`,
      imageAlt: detail.imageAlt ?? `${detail.portfolioTitle} products arranged as commercial ingredients`,
      products: detail.products.map((item) => ({
        ...item,
        image: PRODUCT_CARD_IMAGE_OVERRIDES[`${slug}/${item.id}`]
          ?? item.image
          ?? `/media/products/${slug}/${item.id}.webp`,
        imageAlt: item.imageAlt ?? `${item.title} shown in its commercial product form`,
      })),
      shipment: {
        ...detail.shipment,
        image: detail.shipment.image ?? `/media/products/${slug}/supply-v2.webp`,
        imageAlt: detail.shipment.imageAlt ?? `${detail.portfolioTitle} packing and supply formats`,
      },
    },
  ]),
);

const criteriaByProduct: Record<string, ProductSelectionCriterion[]> = {
  "cocoa-beans": [
    { parameter: "Product basis", specification: "Fermented and dried whole beans" }, { parameter: "Storage moisture", specification: "About 7.5% after drying; lot value confirmed" },
    { parameter: "Quality review", specification: "Bean count, cut test, defects and origin" }, { parameter: "Food safety", specification: "Residues, contaminants and microbiology by market" },
  ],
  "cocoa-powder": [
    { parameter: "Moisture", specification: "≤7% (Codex)" }, { parameter: "Cocoa butter", specification: "≥20%; fat-reduced 10–<20%; highly reduced <10%" },
    { parameter: "Process profile", specification: "Natural or alkalised; colour and pH by offer" }, { parameter: "Particle / micro", specification: "Supplier specification and application confirmed" },
  ],
  "cocoa-butter": [
    { parameter: "Free fatty acids", specification: "≤1.75% (Codex)" }, { parameter: "Unsaponifiable matter", specification: "≤0.7%; press butter ≤0.35%" },
    { parameter: "Process profile", specification: "Natural or deodorised" }, { parameter: "Delivery form", specification: "Blocks, drums or heated bulk by route" },
  ],
  "cocoa-mass-liquor": [
    { parameter: "Cocoa butter", specification: "47–60% (Codex)" }, { parameter: "Shell and germ", specification: "≤5% fat-free dry matter (Codex basis)" },
    { parameter: "Process profile", specification: "Origin, roast and fineness by recipe" }, { parameter: "Delivery form", specification: "Blocks, kibbled mass or liquid" },
  ],
  "milling-wheat": [
    { parameter: "Minimum test weight", specification: "68 kg/hl (Codex)" }, { parameter: "Shrunken / broken", specification: "≤5% (Codex)" },
    { parameter: "Damaged kernels", specification: "≤6% (Codex)" }, { parameter: "Milling tests", specification: "Protein, falling number and gluten by mill target" },
  ],
  "durum-wheat-pasta": [
    { parameter: "Minimum test weight", specification: "70 kg/hl (Codex)" }, { parameter: "Shrunken / broken", specification: "≤6% (Codex)" },
    { parameter: "Damaged kernels", specification: "≤4% (Codex)" }, { parameter: "Pasta tests", specification: "Vitreous kernels, protein and colour by semolina target" },
  ],
  "corn-maize": [
    { parameter: "Grade basis", specification: "Food or processing grade by destination" }, { parameter: "Physical tests", specification: "Moisture, test weight, broken kernels and foreign matter" },
    { parameter: "Identity", specification: "Crop, variety and GMO status where required" }, { parameter: "Safety", specification: "Mycotoxins and residues by destination limit" },
  ],
  "sunflower-seed": [
    { parameter: "Commercial type", specification: "Oilseed or confectionery" }, { parameter: "Key tests", specification: "Moisture, admixture, size and kernel condition" },
    { parameter: "Oil performance", specification: "Oil content by crushing programme" }, { parameter: "Safety", specification: "Residues and contaminants by destination" },
  ],
  "whole-milk-powder": [
    { parameter: "Milk fat", specification: "26–<42% (Codex)" }, { parameter: "Water", specification: "≤5% (Codex)" },
    { parameter: "Milk protein in MSNF", specification: "≥34% (Codex)" }, { parameter: "Functional grade", specification: "Heat class and solubility by application" },
  ],
  "skimmed-milk-powder": [
    { parameter: "Milk fat", specification: "≤1.5% (Codex)" }, { parameter: "Water", specification: "≤5% (Codex)" },
    { parameter: "Milk protein in MSNF", specification: "≥34% (Codex)" }, { parameter: "Functional grade", specification: "Heat class and solubility by application" },
  ],
  "instant-milk-powder": [
    { parameter: "Base", specification: "Whole or skim milk powder" }, { parameter: "Instant properties", specification: "Wettability and dispersibility by offer" },
    { parameter: "Treatment", specification: "Agglomerated; lecithinated where specified" }, { parameter: "Composition", specification: "Fat, protein and water by base powder" },
  ],
  "fat-filled-milk-powder": [
    { parameter: "Composition", specification: "Dairy solids plus declared vegetable-fat system" }, { parameter: "Fat level", specification: "Application-specific; offer confirmed" },
    { parameter: "Functional tests", specification: "Solubility, flavour and emulsion performance" }, { parameter: "Declaration", specification: "Ingredient and destination labelling reviewed" },
  ],
  "whey-powder": [
    { parameter: "Type", specification: "Sweet whey or acid whey" }, { parameter: "Water", specification: "≤5% (Codex)" },
    { parameter: "Milk protein", specification: "Sweet whey reference ≥11%" }, { parameter: "Composition", specification: "Lactose, ash and fat by Codex type / offer" },
  ],
  "lactose": [
    { parameter: "Form", specification: "Monohydrate or anhydrous" }, { parameter: "Key tests", specification: "Lactose assay, water and ash" },
    { parameter: "Physical grade", specification: "Mesh and bulk density by application" }, { parameter: "Approval", specification: "Food or specialist grade by intended use" },
  ],
  "dairy-whey-permeate": [
    { parameter: "Source", specification: "Milk permeate or whey permeate" }, { parameter: "Composition", specification: "Lactose, protein, ash and minerals" },
    { parameter: "Water", specification: "Supplier specification confirmed" }, { parameter: "Function", specification: "Browning, flavour and solids contribution" },
  ],
  "butter": [
    { parameter: "Milk fat", specification: "≥80% (Codex butter basis)" }, { parameter: "Water", specification: "≤16% (Codex butter basis)" },
    { parameter: "Salt", specification: "Salted or unsalted" }, { parameter: "Format", specification: "Blocks, sheets or portions" },
  ],
  "cheese": [
    { parameter: "Identity", specification: "Variety and maturity" }, { parameter: "Composition", specification: "Fat in dry matter and moisture" },
    { parameter: "Performance", specification: "Melt, stretch, slice or shred by application" }, { parameter: "Cold chain", specification: "Temperature and remaining shelf life confirmed" },
  ],
  "cheese-analogues": [
    { parameter: "Fat system", specification: "Dairy and/or vegetable fat, declared by formula" }, { parameter: "Performance", specification: "Melt, stretch, browning and oiling-off" },
    { parameter: "Format", specification: "Block, loaf, slice or shred" }, { parameter: "Declaration", specification: "Destination naming and ingredient rules reviewed" },
  ],
  "uht-milk": [
    { parameter: "Fat class", specification: "Whole, semi-skimmed or skimmed" }, { parameter: "Process", specification: "UHT treated and aseptically packed" },
    { parameter: "Pack", specification: "Unit size and closure by programme" }, { parameter: "Shelf life", specification: "Producer validation and destination label confirmed" },
  ],
};

const sharedCriteriaById: Record<string, ProductSelectionCriterion[]> = {
  "sunflower-oil": [{ parameter: "Oil identity", specification: "Codex fatty-acid profile" }, { parameter: "Grade", specification: "Crude or refined" }, { parameter: "Key tests", specification: "FFA, peroxide value, colour and moisture" }, { parameter: "Delivery", specification: "Retail, drums, IBC or bulk" }],
  "corn-oil": [{ parameter: "Oil identity", specification: "Maize oil; Codex fatty-acid profile" }, { parameter: "Grade", specification: "Crude or refined" }, { parameter: "Key tests", specification: "FFA, peroxide value, colour and moisture" }, { parameter: "Delivery", specification: "Retail, drums, IBC or bulk" }],
  "olive-oil": [{ parameter: "Category", specification: "Virgin, refined or blend; designation confirmed" }, { parameter: "Key tests", specification: "Free acidity, peroxide value and UV criteria" }, { parameter: "Sensory", specification: "Required for virgin categories" }, { parameter: "Delivery", specification: "Retail or bulk by programme" }],
  "palm-oil": [{ parameter: "Product", specification: "Palm oil; not palm olein" }, { parameter: "Physical profile", specification: "Slip melting point and iodine value" }, { parameter: "Key tests", specification: "FFA, peroxide value, colour and moisture" }, { parameter: "Delivery", specification: "Drums, flexitank or heated bulk" }],
  "palm-olein": [{ parameter: "Product", specification: "Liquid fraction of palm oil" }, { parameter: "Physical profile", specification: "Cloud point and iodine value" }, { parameter: "Key tests", specification: "FFA, peroxide value, colour and moisture" }, { parameter: "Delivery", specification: "Retail, flexitank or bulk" }],
  "margarine": [{ parameter: "Fat level", specification: "Recipe and market designation confirmed" }, { parameter: "Performance", specification: "Spreadability, emulsion and melting profile" }, { parameter: "Format", specification: "Retail tubs/blocks or industrial" }, { parameter: "Storage", specification: "Producer temperature and shelf-life conditions" }],
  "bakery-pastry-fats": [{ parameter: "Application", specification: "Cake, filling, lamination or frying" }, { parameter: "Performance", specification: "Plasticity, creaming and melting profile" }, { parameter: "Fat system", specification: "Palm, non-palm or blended by requirement" }, { parameter: "Format", specification: "Blocks, cartons or bulk" }],
  "specialty-fats": [{ parameter: "Application", specification: "Confectionery, filling, coating or dairy alternative" }, { parameter: "Melting profile", specification: "Solid-fat content curve by application" }, { parameter: "Compatibility", specification: "Lauric/non-lauric and cocoa-butter compatibility" }, { parameter: "Format", specification: "Blocks, cartons or bulk" }],
  "corn-starch": [{ parameter: "Source", specification: "Maize" }, { parameter: "Type", specification: "Native starch" }, { parameter: "Functional tests", specification: "Viscosity, moisture, pH and microbiology" }, { parameter: "Application", specification: "Thickening, binding and texture" }],
  "tapioca-starch": [{ parameter: "Source", specification: "Cassava / tapioca" }, { parameter: "Type", specification: "Native starch" }, { parameter: "Functional tests", specification: "Peak viscosity, clarity and moisture" }, { parameter: "Application", specification: "Texture, noodles, bakery and gluten-free systems" }],
  "wheat-starch": [{ parameter: "Source", specification: "Wheat" }, { parameter: "Type", specification: "Native starch" }, { parameter: "Functional tests", specification: "Viscosity, moisture and residual protein" }, { parameter: "Allergen", specification: "Wheat declaration required" }],
  "potato-starch": [{ parameter: "Source", specification: "Potato" }, { parameter: "Type", specification: "Native starch" }, { parameter: "Functional tests", specification: "High swelling, viscosity and granulation" }, { parameter: "Application", specification: "Sauces, noodles, snacks and meat systems" }],
  "rice-starch": [{ parameter: "Source", specification: "Rice" }, { parameter: "Type", specification: "Native starch" }, { parameter: "Functional tests", specification: "Particle size, viscosity and whiteness" }, { parameter: "Application", specification: "Fine texture, coatings and dairy alternatives" }],
  "pea-starch": [{ parameter: "Source", specification: "Pea" }, { parameter: "Type", specification: "Native starch" }, { parameter: "Functional tests", specification: "Amylose profile, viscosity and gel strength" }, { parameter: "Application", specification: "Noodles, texture and plant-based foods" }],
  "modified-starches": [{ parameter: "Base", specification: "Botanical source and modification declared" }, { parameter: "Function", specification: "Heat, acid, shear, freeze/thaw or process stability" }, { parameter: "Regulatory", specification: "Additive identity and destination permission" }, { parameter: "Performance", specification: "Application trial and supplier specification" }],
  "vital-wheat-gluten": [{ parameter: "Source", specification: "Wheat protein" }, { parameter: "Protein", specification: "Dry-basis supplier specification" }, { parameter: "Functional tests", specification: "Water absorption, elasticity and vitality" }, { parameter: "Allergen", specification: "Wheat/gluten declaration required" }],
  "pea-protein": [{ parameter: "Form", specification: "Concentrate or isolate" }, { parameter: "Protein", specification: "Dry-basis assay by offer" }, { parameter: "Functional tests", specification: "Solubility, flavour and dispersibility" }, { parameter: "Application", specification: "Beverage, bakery and plant-based foods" }],
  "glucose-syrup": [{ parameter: "Definition", specification: "DE ≥20 (Codex)" }, { parameter: "Dry matter", specification: "≥70% (Codex)" }, { parameter: "Selection", specification: "DE, carbohydrate profile and viscosity" }, { parameter: "Delivery", specification: "Drum, IBC or bulk tanker" }],
  "fructose-syrup": [{ parameter: "Identity", specification: "Glucose-fructose syrup; naming by composition/market" }, { parameter: "Selection", specification: "Fructose content, dry matter and carbohydrate profile" }, { parameter: "Function", specification: "Sweetness, body and freezing-point control" }, { parameter: "Delivery", specification: "Drum, IBC or bulk tanker" }],
  "maltodextrin": [{ parameter: "Definition", specification: "Starch hydrolysate below glucose-syrup DE threshold" }, { parameter: "Selection", specification: "DE range and botanical source" }, { parameter: "Functional tests", specification: "Solubility, bulk density and hygroscopicity" }, { parameter: "Delivery", specification: "Lined bags or big bags" }],
  "dextrose-monohydrate": [{ parameter: "D-glucose", specification: "≥99.5% dry basis (Codex)" }, { parameter: "Dry matter", specification: "≥90% (Codex)" }, { parameter: "Form", specification: "Crystalline monohydrate" }, { parameter: "Selection", specification: "Mesh and microbiology by application" }],
  "dextrose-anhydrous": [{ parameter: "D-glucose", specification: "≥99.5% dry basis (Codex)" }, { parameter: "Dry matter", specification: "≥98% (Codex)" }, { parameter: "Form", specification: "Crystalline anhydrous" }, { parameter: "Selection", specification: "Mesh and microbiology by application" }],
  "sorbitol": [{ parameter: "Form", specification: "Crystalline or solution" }, { parameter: "Selection", specification: "Assay, solids and reducing sugars" }, { parameter: "Function", specification: "Sweetener, humectant and texture control" }, { parameter: "Delivery", specification: "Bags, drums, IBC or bulk" }],
  "maltitol": [{ parameter: "Form", specification: "Crystalline or syrup" }, { parameter: "Selection", specification: "Maltitol assay and dry matter" }, { parameter: "Function", specification: "Sugar-reduced confectionery and coatings" }, { parameter: "Delivery", specification: "Bags, drums, IBC or bulk" }],
  "xylitol": [{ parameter: "Form", specification: "Crystalline powder" }, { parameter: "Selection", specification: "Assay, mesh, water and source" }, { parameter: "Function", specification: "Bulk sweetener for gum, confectionery and oral care" }, { parameter: "Delivery", specification: "Lined bags or drums" }],
  "erythritol": [{ parameter: "Form", specification: "Fermentation-derived crystalline powder" }, { parameter: "Selection", specification: "Assay, mesh, water and microbiology" }, { parameter: "Function", specification: "Bulk and sweetness adjustment" }, { parameter: "Delivery", specification: "Lined bags" }],
  "glycerol": [{ parameter: "Grade", specification: "Food grade" }, { parameter: "Selection", specification: "Assay, water, colour and source" }, { parameter: "Function", specification: "Humectant, solvent and texture control" }, { parameter: "Delivery", specification: "Drums, IBC or bulk" }],
  "allulose": [{ parameter: "Form", specification: "Crystalline or syrup" }, { parameter: "Selection", specification: "Assay, dry matter and source" }, { parameter: "Regulatory", specification: "Destination-market and application approval required" }, { parameter: "Function", specification: "Bulk sweetener for reduced-sugar systems" }],
  "stevia": [{ parameter: "Form", specification: "Steviol glycoside extract or formulated blend" }, { parameter: "Selection", specification: "Glycoside profile, assay and taste target" }, { parameter: "Intensity", specification: "High-intensity; dosage set by formulation" }, { parameter: "Regulatory", specification: "Destination approval and labelling reviewed" }],
  "raisins-sultanas": [{ parameter: "Standard basis", specification: "UNECE DDP-11" }, { parameter: "Selection", specification: "Variety, berry size, colour and treatment" }, { parameter: "Quality", specification: "Moisture, defects and foreign matter by class" }, { parameter: "Safety", specification: "Residues and microbiology by destination" }],
  "dried-apricots": [{ parameter: "Standard basis", specification: "UNECE DDP-15" }, { parameter: "Classes", specification: "Extra, Class I or Class II" }, { parameter: "Selection", specification: "Size, colour, sulphured/natural and moisture" }, { parameter: "Format", specification: "Whole, halves, diced or paste" }],
  "dates": [{ parameter: "Standard basis", specification: "UNECE DDP-08" }, { parameter: "Moisture", specification: "≤26% cane-sugar; ≤30% invert-sugar varieties" }, { parameter: "Minimum fruit weight", specification: "4 g" }, { parameter: "Selection", specification: "Variety, size and pitted/unpitted" }],
  "dried-figs": [{ parameter: "Standard basis", specification: "UNECE DDP-14" }, { parameter: "Classes", specification: "Extra, Class I or Class II" }, { parameter: "Selection", specification: "Size, moisture and defects" }, { parameter: "Safety", specification: "Aflatoxin controls and destination limits" }],
  "in-shell-pistachios": [{ parameter: "Standard basis", specification: "UNECE DDP-09" }, { parameter: "Selection", specification: "Size count and naturally/opened status" }, { parameter: "Quality", specification: "Closed shells, moisture and defects" }, { parameter: "Safety", specification: "Aflatoxin controls and destination limits" }],
  "pistachio-kernels": [{ parameter: "Standard basis", specification: "UNECE DDP-10" }, { parameter: "Selection", specification: "Whole/pieces, peeled status, colour and size" }, { parameter: "Quality", specification: "Moisture and defects by class" }, { parameter: "Safety", specification: "Aflatoxin controls and destination limits" }],
  "walnuts": [{ parameter: "Standard basis", specification: "UNECE DDP-01 / DDP-02" }, { parameter: "Form", specification: "In-shell or kernels; halves/pieces" }, { parameter: "Selection", specification: "Size, colour, moisture and defects" }, { parameter: "Safety", specification: "Contaminants and destination limits" }],
  "french-fries": [{ parameter: "Storage", specification: "−18°C or colder" }, { parameter: "Selection", specification: "Cut, coating and potato-solids target" }, { parameter: "Performance", specification: "Fry time, yield and hold performance" }, { parameter: "Pack", specification: "Foodservice or retail bags in cartons" }],
  "frozen-fruit-vegetables": [{ parameter: "Storage", specification: "−18°C or colder" }, { parameter: "Format", specification: "IQF, block, purée or pieces" }, { parameter: "Selection", specification: "Species, variety, cut, size and defects" }, { parameter: "Safety", specification: "Microbiology and residue plan by destination" }],
  "frozen-poultry": [{ parameter: "Storage", specification: "−18°C or colder" }, { parameter: "Definition", specification: "Species, cut, bone/skin and processing" }, { parameter: "Approval", specification: "Establishment and market eligibility" }, { parameter: "Certification", specification: "Health, halal and origin documents as required" }],
  "frozen-seafood": [{ parameter: "Storage", specification: "−18°C or colder" }, { parameter: "Identity", specification: "Commercial and scientific species name" }, { parameter: "Selection", specification: "Wild/farmed, size, glaze and treatment" }, { parameter: "Approval", specification: "Establishment, catch/farm and health documents" }],
  "frozen-pastry-bakery": [{ parameter: "Storage", specification: "−18°C or colder" }, { parameter: "Format", specification: "Ready-to-bake, part-baked or finished" }, { parameter: "Preparation", specification: "Proofing and bake time/temperature by product" }, { parameter: "Control", specification: "Allergens, shelf life and carton configuration" }],
  "ketchup": [{ parameter: "Category", specification: "Non-emulsified tomato sauce" }, { parameter: "Selection", specification: "Tomato solids, viscosity, recipe and acidity" }, { parameter: "Pack", specification: "Sachet, bottle, pouch, jar or foodservice" }, { parameter: "Control", specification: "Shelf life, preservatives and label by market" }],
  "mayonnaise": [{ parameter: "Category", specification: "Emulsified sauce" }, { parameter: "Selection", specification: "Oil level, egg system, viscosity and stability" }, { parameter: "Pack", specification: "Sachet, bottle, pouch, jar or foodservice" }, { parameter: "Control", specification: "Allergens, shelf life and label by market" }],
  "canned-foods": [{ parameter: "Process", specification: "Commercially sterile heat-processed product" }, { parameter: "Selection", specification: "Product, medium, net/drained weight and can size" }, { parameter: "Pack", specification: "Can or jar in shipping cartons" }, { parameter: "Control", specification: "Process validation, seams, shelf life and label" }],
  "pasta": [{ parameter: "Base", specification: "Durum semolina or declared recipe" }, { parameter: "Selection", specification: "Shape, protein, cooking time and breakage" }, { parameter: "Pack", specification: "Retail bags/boxes or foodservice sacks" }, { parameter: "Control", specification: "Moisture, label and destination requirements" }],
  "tomato-paste": [{ parameter: "Soluble solids", specification: "≥24% for tomato paste (Codex)" }, { parameter: "pH", specification: "<4.6 (Codex)" }, { parameter: "Lactic acid", specification: "≤1% of natural soluble solids" }, { parameter: "Selection", specification: "Hot/cold break, colour, viscosity and pack" }],
};

export function productCriteria(item: ProductDetailRecord): ProductSelectionCriterion[] {
  return criteriaByProduct[item.id] ?? sharedCriteriaById[item.id] ?? [
    { parameter: "Commercial form", specification: item.format },
    { parameter: "Application", specification: item.fit },
    { parameter: "Technical review", specification: item.selection },
    { parameter: "Offer confirmation", specification: "Final specification and COA confirmed with the offered product" },
  ];
}

export function getProductCategoryDetail(slug: string) {
  return productCategoryDetails[slug];
}
