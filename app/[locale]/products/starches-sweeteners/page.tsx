import type { Metadata } from "next";
import { ProductDetailLayout } from "@/components/product-detail-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { categoryCardItemBySlug } from "@/content/product-card-items";
import { pages } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata, productFamilyJsonLd } from "@/lib/seo";

const breadcrumb = [
  { label: "Home", href: "/en" },
  { label: "Products", href: "/en/products" },
  { label: "Starches & Sweeteners", href: "/en/products/starches-sweeteners" },
];

function ingredientQuoteHref(product?: string) {
  const params = new URLSearchParams({ category: "starches-sweeteners" });
  if (product) params.set("product", product);
  return `/en/request-a-quote?${params.toString()}`;
}

const starchesRelated = ["grains-seeds", "sugar", "dairy-milk-powders"]
  .map(categoryCardItemBySlug)
  .filter((item): item is NonNullable<typeof item> => Boolean(item))
  .map((item) => ({
    label: item.title,
    href: item.href,
    description: item.description,
    image: item.image,
    imageAlt: item.imageAlt,
  }));

export function generateMetadata(): Metadata {
  return buildMetadata(pages.starches.seo);
}

export default function StarchesSweetenersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <JsonLd
        data={productFamilyJsonLd({
          title: "Starches & Sweeteners",
          summary: pages.starches.description,
          href: "/en/products/starches-sweeteners",
          image: "/media/products/starches-sweeteners/starches-sweeteners-hero-stock-v1.webp",
        })}
      />
      <ProductDetailLayout
        pageTreatment="polished"
        breadcrumb={breadcrumb}
        hero={{
          title: "Connecting crop-based ingredients to the performance your product needs.",
          text: [
            "A3 sources native and modified starches, plant proteins, glucose ingredients, polyols and specialty sweeteners for food, beverage and selected industrial applications.",
            "We start with the result you need—texture, stability, sweetness, bulk, moisture control or protein performance—then align botanical source, grade, regulatory fit, packing and delivery.",
          ],
          image: "/media/products/starches-sweeteners/starches-sweeteners-hero-stock-v1.webp",
          imageAlt: "Green maize field extending toward hills and a rural farmhouse",
          hideBreadcrumb: true,
          variant: "compact",
        }}
        sectionNavigation={[
          { label: "Overview", href: "#overview" },
          { label: "Products", href: "#range" },
          { label: "Market context", href: "#key-facts" },
          { label: "Services", href: "#integrated-value-chain" },
          { label: "Contact", href: "#contact" },
        ]}
        productPortfolio={{
          id: "range",
          title: "Starches & Sweeteners Portfolio",
          text: "Twenty-one ingredient routes, grouped by the job they perform. Choose by finished-product need rather than name alone; A3 confirms final grade, supplier specification and destination approval with the offer.",
          cardTreatment: "category-overlay",
          compactCardCopy: true,
          modalTreatment: "decision-summary",
          showAllFilter: false,
          filters: [
            { id: "starches", label: "Native & Modified Starches", itemIds: ["corn-starch", "tapioca-starch", "wheat-starch", "potato-starch", "rice-starch", "pea-starch", "modified-starches"] },
            { id: "proteins", label: "Plant Proteins", itemIds: ["vital-wheat-gluten", "pea-protein"] },
            { id: "glucose", label: "Glucose Ingredients & Syrups", itemIds: ["glucose-syrup", "fructose-syrup", "maltodextrin", "dextrose-monohydrate", "dextrose-anhydrous"] },
            { id: "polyols", label: "Polyols & Humectants", itemIds: ["sorbitol", "maltitol", "xylitol", "erythritol", "glycerol"] },
            { id: "specialty", label: "Specialty Sweeteners", itemIds: ["allulose", "stevia"] },
          ],
          items: [
            {
              id: "corn-starch",
              title: "Corn Starch",
              description: "A versatile maize starch for thickening, binding and texture in everyday food production.",
              image: "/media/products/starches-sweeteners/corn-starch-light-v2.webp",
              imageAlt: "Fine white corn starch with maize kernels and a cut corn cob",
              decisionSummary: {
                lead: "A strong starting point when the brief calls for familiar, cost-effective texture and binding.",
                facts: [
                  { title: "Base / source", description: "Maize" },
                  { title: "Commercial form", description: "Fine powder" },
                  { title: "Typical fit", description: "Sauces, bakery, dairy and dry mixes" },
                ],
                points: ["Target viscosity and gel", "Cooking conditions", "Moisture and microbiology", "GMO requirement where relevant"],
                supply: "Lined bags or big bags, subject to producer and route.",
              },
              cta: { label: "Request a corn starch offer", href: ingredientQuoteHref("corn-starch") },
            },
            {
              id: "tapioca-starch",
              title: "Tapioca Starch",
              description: "Cassava starch for clean flavour, smooth texture and gluten-free formulations.",
              image: "/media/products/starches-sweeteners/tapioca-starch-light-v2.webp",
              imageAlt: "Fine white tapioca starch with fresh cassava roots",
              decisionSummary: {
                lead: "Choose tapioca when neutral flavour, clarity or a more elastic texture matters to the finished product.",
                facts: [
                  { title: "Base / source", description: "Cassava / tapioca" },
                  { title: "Commercial form", description: "Fine powder" },
                  { title: "Typical fit", description: "Sauces, noodles, snacks and gluten-free foods" },
                ],
                points: ["Viscosity and clarity", "Process temperature", "Whiteness and moisture", "Microbiological requirement"],
                supply: "Lined bags or big bags, subject to producer and route.",
              },
              cta: { label: "Request a tapioca starch offer", href: ingredientQuoteHref("tapioca-starch") },
            },
            {
              id: "wheat-starch",
              title: "Wheat Starch",
              description: "Wheat-derived starch for bakery, coatings, confectionery and prepared foods.",
              image: "/media/products/starches-sweeteners/wheat-starch-light-v2.webp",
              imageAlt: "Fine white wheat starch with pale wheat ears",
              decisionSummary: {
                lead: "Useful where wheat-based sourcing and smooth texture fit the recipe; wheat allergen controls remain essential.",
                facts: [
                  { title: "Base / source", description: "Wheat" },
                  { title: "Commercial form", description: "Fine powder" },
                  { title: "Typical fit", description: "Bakery, coatings and prepared foods" },
                ],
                points: ["Residual protein", "Viscosity and moisture", "Wheat declaration", "Application and process conditions"],
                supply: "Lined bags or big bags with wheat-allergen documentation.",
              },
              cta: { label: "Request a wheat starch offer", href: ingredientQuoteHref("wheat-starch") },
            },
            {
              id: "potato-starch",
              title: "Potato Starch",
              description: "High-swelling starch for viscosity, water binding and structured texture.",
              image: "/media/products/starches-sweeteners/potato-starch-light-v2.webp",
              imageAlt: "Fine white potato starch with whole and cut potatoes",
              decisionSummary: {
                lead: "Choose potato starch when the formulation needs strong viscosity or water binding at a practical use level.",
                facts: [
                  { title: "Base / source", description: "Potato" },
                  { title: "Commercial form", description: "Fine powder" },
                  { title: "Typical fit", description: "Soups, sauces, noodles and snacks" },
                ],
                points: ["Peak viscosity", "Granulation", "Heat and shear conditions", "Microbiological requirement"],
                supply: "Lined bags or big bags, subject to producer and route.",
              },
              cta: { label: "Request a potato starch offer", href: ingredientQuoteHref("potato-starch") },
            },
            {
              id: "rice-starch",
              title: "Rice Starch",
              description: "Fine-granule starch for smooth texture, neutral colour and specialised formulations.",
              image: "/media/products/starches-sweeteners/rice-starch-light-v2.webp",
              imageAlt: "Fine white rice starch with polished rice grains and a rice panicle",
              decisionSummary: {
                lead: "Useful when a very smooth mouthfeel and a restrained flavour and colour profile matter.",
                facts: [
                  { title: "Base / source", description: "Rice" },
                  { title: "Commercial form", description: "Fine powder" },
                  { title: "Typical fit", description: "Dairy, desserts, sauces and bakery" },
                ],
                points: ["Particle-size profile", "Purity and moisture", "Viscosity target", "Microbiological requirement"],
                supply: "Lined industrial bags; big bags where offered.",
              },
              cta: { label: "Request a rice starch offer", href: ingredientQuoteHref("rice-starch") },
            },
            {
              id: "pea-starch",
              title: "Pea Starch",
              description: "Pulse-derived starch for binding, firm texture and plant-based foods.",
              image: "/media/products/starches-sweeteners/pea-starch-light-v2.webp",
              imageAlt: "Fine pale pea starch with dry yellow peas and split peas",
              decisionSummary: {
                lead: "A useful route when pea-based sourcing and gel or binding performance fit the formulation.",
                facts: [
                  { title: "Base / source", description: "Yellow pea" },
                  { title: "Commercial form", description: "Fine powder" },
                  { title: "Typical fit", description: "Noodles, snacks and plant-based foods" },
                ],
                points: ["Amylose and gel performance", "Residual protein", "Viscosity", "Flavour and microbiology"],
                supply: "Lined bags or big bags, subject to producer and route.",
              },
              cta: { label: "Request a pea starch offer", href: ingredientQuoteHref("pea-starch") },
            },
            {
              id: "modified-starches",
              title: "Modified Starches",
              description: "Application-specific starches designed for demanding processing and storage conditions.",
              image: "/media/products/starches-sweeteners/modified-starches-light-v2.webp",
              imageAlt: "Application-specific modified starch powder with restrained maize, wheat and potato cues",
              decisionSummary: {
                lead: "Use a modified starch when native starch cannot hold the required texture through heat, acid, shear, freezing or shelf life.",
                facts: [
                  { title: "Base / source", description: "Botanical source confirmed by offer" },
                  { title: "Commercial form", description: "Application-specific powder" },
                  { title: "Typical fit", description: "Sauces, dairy, frozen foods and prepared meals" },
                ],
                points: ["Base crop and modification", "Process stress", "Target texture and stability", "Additive and labelling requirements"],
                supply: "Lined bags or big bags; final identity and declaration are offer-specific.",
              },
              cta: { label: "Request a modified starch offer", href: ingredientQuoteHref("modified-starches") },
            },
            {
              id: "vital-wheat-gluten",
              title: "Vital Wheat Gluten",
              description: "Concentrated wheat protein that strengthens dough and adds structure.",
              image: "/media/products/starches-sweeteners/vital-wheat-gluten-light-v2.webp",
              imageAlt: "Warm beige vital wheat gluten powder with wheat ears",
              decisionSummary: {
                lead: "For dough strength, elasticity or protein enrichment where wheat allergen declaration is acceptable.",
                facts: [
                  { title: "Base / source", description: "Wheat protein" },
                  { title: "Commercial form", description: "Fine protein powder" },
                  { title: "Typical fit", description: "Bread, bakery and meat alternatives" },
                ],
                points: ["Protein level", "Water absorption", "Vitality and elasticity", "Allergen and microbiological controls"],
                supply: "Lined bags or big bags with wheat-allergen documentation.",
              },
              cta: { label: "Request a vital wheat gluten offer", href: ingredientQuoteHref("vital-wheat-gluten") },
            },
            {
              id: "pea-protein",
              title: "Pea Protein",
              description: "Pea-based protein for plant-based foods, beverages, bakery and nutrition products.",
              image: "/media/products/starches-sweeteners/pea-protein-light-v2.webp",
              imageAlt: "Cream-coloured pea protein powder with dry yellow peas and split peas",
              decisionSummary: {
                lead: "Select by protein level and by how the ingredient must taste, disperse and perform in the recipe.",
                facts: [
                  { title: "Base / source", description: "Pea" },
                  { title: "Commercial form", description: "Concentrate or isolate powder" },
                  { title: "Typical fit", description: "Plant-based foods, beverages and nutrition" },
                ],
                points: ["Concentrate or isolate", "Protein assay", "Solubility and dispersibility", "Flavour, colour and microbiology"],
                supply: "Lined industrial bags; final protein grade is confirmed by offer.",
              },
              cta: { label: "Request a pea protein offer", href: ingredientQuoteHref("pea-protein") },
            },
            {
              id: "glucose-syrup",
              title: "Glucose Syrup",
              description: "A liquid starch sweetener that adds body, sweetness and process control.",
              image: "/media/products/starches-sweeteners/glucose-syrup-light-v2.webp",
              imageAlt: "Clear amber glucose syrup in a laboratory-style glass vessel",
              decisionSummary: {
                lead: "Useful where the recipe needs more than sweetness—body, controlled crystallisation or stable texture.",
                facts: [
                  { title: "Base / source", description: "Purified starch hydrolysate" },
                  { title: "Commercial form", description: "Liquid syrup" },
                  { title: "Typical fit", description: "Confectionery, bakery and beverages" },
                ],
                points: ["Dextrose equivalent", "Carbohydrate profile", "Dry solids and viscosity", "Colour and flavour target"],
                supply: "Food-grade drums, IBCs or bulk tanker, subject to route.",
              },
              cta: { label: "Request a glucose syrup offer", href: ingredientQuoteHref("glucose-syrup") },
            },
            {
              id: "fructose-syrup",
              title: "Fructose Syrup",
              description: "Glucose-fructose syrup for formulations needing defined sweetness and solids.",
              image: "/media/products/starches-sweeteners/fructose-syrup-light-v2.webp",
              imageAlt: "Clear pale fructose syrup in a laboratory-style glass vessel",
              decisionSummary: {
                lead: "Select by fructose content and carbohydrate profile, not by the generic word ‘syrup’ alone.",
                facts: [
                  { title: "Base / source", description: "Glucose-fructose syrup" },
                  { title: "Commercial form", description: "Liquid syrup" },
                  { title: "Typical fit", description: "Beverages and food manufacturing" },
                ],
                points: ["Fructose content", "Dry solids", "Acidity and colour", "Destination naming and labelling"],
                supply: "Food-grade drums, IBCs or bulk tanker, subject to route.",
              },
              cta: { label: "Request a fructose syrup offer", href: ingredientQuoteHref("fructose-syrup") },
            },
            {
              id: "maltodextrin",
              title: "Maltodextrin",
              description: "A low-sweetness powder that builds body, carries flavours and supports dry formulations.",
              image: "/media/products/starches-sweeteners/maltodextrin-light-v2.webp",
              imageAlt: "Fine white maltodextrin powder in a clean commercial sample vessel",
              decisionSummary: {
                lead: "Use when the brief needs soluble solids and body without the sweetness of sugar.",
                facts: [
                  { title: "Base / source", description: "Starch hydrolysate" },
                  { title: "Commercial form", description: "Spray-dried powder" },
                  { title: "Typical fit", description: "Beverages, flavours, dry mixes and nutrition" },
                ],
                points: ["DE range", "Botanical source", "Solubility", "Bulk density and hygroscopicity"],
                supply: "Lined bags or big bags with dry-storage handling.",
              },
              cta: { label: "Request a maltodextrin offer", href: ingredientQuoteHref("maltodextrin") },
            },
            {
              id: "dextrose-monohydrate",
              title: "Dextrose Monohydrate",
              description: "Crystalline glucose for sweetness, fermentation and food processing.",
              image: "/media/products/starches-sweeteners/dextrose-monohydrate-light-v2.webp",
              imageAlt: "Fine crystalline dextrose monohydrate presented as a commercial sample",
              decisionSummary: {
                lead: "The monohydrate route suits broad food and fermentation uses where the water-containing crystal form is accepted.",
                facts: [
                  { title: "Base / source", description: "Purified D-glucose" },
                  { title: "Commercial form", description: "Crystalline monohydrate" },
                  { title: "Typical fit", description: "Bakery, beverages and fermentation" },
                ],
                points: ["D-glucose assay", "Moisture", "Mesh and dissolution", "Microbiological requirement"],
                supply: "Lined bags or big bags, subject to producer and route.",
              },
              cta: { label: "Request a dextrose monohydrate offer", href: ingredientQuoteHref("dextrose-monohydrate") },
            },
            {
              id: "dextrose-anhydrous",
              title: "Dextrose Anhydrous",
              description: "Low-moisture crystalline glucose for dry mixes and moisture-sensitive formulations.",
              image: "/media/products/starches-sweeteners/dextrose-anhydrous-light-v2.webp",
              imageAlt: "Dry crystalline dextrose anhydrous presented as a commercial sample",
              decisionSummary: {
                lead: "Choose the anhydrous form when added crystal water must be minimised.",
                facts: [
                  { title: "Base / source", description: "Purified D-glucose" },
                  { title: "Commercial form", description: "Crystalline anhydrous powder" },
                  { title: "Typical fit", description: "Dry mixes, beverages and confectionery" },
                ],
                points: ["D-glucose assay", "Water level", "Mesh and dissolution", "Microbiological requirement"],
                supply: "Lined bags, big bags or drums by offered grade.",
              },
              cta: { label: "Request a dextrose anhydrous offer", href: ingredientQuoteHref("dextrose-anhydrous") },
            },
            {
              id: "sorbitol",
              title: "Sorbitol",
              description: "A liquid or crystalline polyol for sweetness, softness and moisture retention.",
              image: "/media/products/starches-sweeteners/sorbitol-light-v2.webp",
              imageAlt: "Clear sorbitol solution and white crystalline sorbitol samples",
              decisionSummary: {
                lead: "Useful when the product must stay soft or retain moisture as well as taste sweet.",
                facts: [
                  { title: "Base / source", description: "Food-grade polyol" },
                  { title: "Commercial form", description: "Solution or crystalline powder" },
                  { title: "Typical fit", description: "Confectionery, bakery and oral care" },
                ],
                points: ["Solution or powder", "Assay and solids", "Reducing sugars", "Viscosity and application"],
                supply: "Bags for crystals; drums, IBCs or bulk for solution grades.",
              },
              cta: { label: "Request a sorbitol offer", href: ingredientQuoteHref("sorbitol") },
            },
            {
              id: "maltitol",
              title: "Maltitol",
              description: "A polyol sweetener for sugar-reduced confectionery, bakery and coatings.",
              image: "/media/products/starches-sweeteners/maltitol-light-v2.webp",
              imageAlt: "White crystalline maltitol and clear maltitol syrup samples",
              decisionSummary: {
                lead: "A close-to-sugar bulking route for products that still need body and texture.",
                facts: [
                  { title: "Base / source", description: "Food-grade polyol" },
                  { title: "Commercial form", description: "Syrup or crystalline product" },
                  { title: "Typical fit", description: "Confectionery, bakery and coatings" },
                ],
                points: ["Syrup or crystalline form", "Maltitol assay", "Dry solids", "Processing and crystallisation behaviour"],
                supply: "Bags for crystals; drums, IBCs or bulk for syrup grades.",
              },
              cta: { label: "Request a maltitol offer", href: ingredientQuoteHref("maltitol") },
            },
            {
              id: "xylitol",
              title: "Xylitol",
              description: "A crystalline bulk sweetener for gum, confectionery, oral care and tabletop products.",
              image: "/media/products/starches-sweeteners/xylitol-light-v2.webp",
              imageAlt: "White crystalline xylitol in a clean commercial sample vessel",
              decisionSummary: {
                lead: "Choose when near-sugar sweetness and a clean cooling profile suit the application.",
                facts: [
                  { title: "Base / source", description: "Source confirmed by offer" },
                  { title: "Commercial form", description: "Crystalline powder" },
                  { title: "Typical fit", description: "Gum, confectionery, oral care and tabletop products" },
                ],
                points: ["Assay", "Particle size", "Source", "Dissolution and destination requirements"],
                supply: "Lined bags or drums, subject to grade and route.",
              },
              cta: { label: "Request a xylitol offer", href: ingredientQuoteHref("xylitol") },
            },
            {
              id: "erythritol",
              title: "Erythritol",
              description: "A low-calorie crystalline polyol for bulk and sweetness adjustment.",
              image: "/media/products/starches-sweeteners/erythritol-light-v2.webp",
              imageAlt: "White crystalline erythritol in a clean commercial sample vessel",
              decisionSummary: {
                lead: "Often used with high-intensity sweeteners where the formula needs bulk with restrained sweetness.",
                facts: [
                  { title: "Base / source", description: "Fermentation-derived polyol" },
                  { title: "Commercial form", description: "Crystalline powder" },
                  { title: "Typical fit", description: "Beverages, tabletop blends and bakery" },
                ],
                points: ["Assay and mesh", "Dissolution and cooling profile", "Fermentation source", "Microbiological requirement"],
                supply: "Lined bags with dry-storage handling.",
              },
              cta: { label: "Request an erythritol offer", href: ingredientQuoteHref("erythritol") },
            },
            {
              id: "glycerol",
              title: "Glycerol",
              description: "A clear food-grade liquid for moisture control, softness and ingredient solubility.",
              image: "/media/products/starches-sweeteners/glycerol-light-v2.webp",
              imageAlt: "Clear viscous food-grade glycerol in a clean glass vessel",
              decisionSummary: {
                lead: "Primarily a humectant and solvent—not a like-for-like replacement for sugar.",
                facts: [
                  { title: "Base / source", description: "Food-grade source confirmed by offer" },
                  { title: "Commercial form", description: "Clear viscous liquid" },
                  { title: "Typical fit", description: "Bakery, confectionery and flavours" },
                ],
                points: ["Food-grade identity", "Assay and water", "Colour and source", "Viscosity and handling"],
                supply: "Food-grade drums, IBCs or bulk with cleanliness controls.",
              },
              cta: { label: "Request a glycerol offer", href: ingredientQuoteHref("glycerol") },
            },
            {
              id: "allulose",
              title: "Allulose",
              description: "A low-calorie rare sugar for markets where its use is authorised.",
              image: "/media/products/starches-sweeteners/allulose-light-v2.webp",
              imageAlt: "White crystalline allulose and a clear allulose syrup sample",
              decisionSummary: {
                lead: "A destination-led ingredient: authorisation, permitted uses and labelling must be cleared before commercial discussion.",
                facts: [
                  { title: "Regulatory basis", description: "Destination authorisation required" },
                  { title: "Commercial form", description: "Crystalline powder or syrup" },
                  { title: "Typical fit", description: "Reduced-sugar foods where permitted" },
                ],
                points: ["Destination authorisation", "Assay and source", "Crystalline or syrup form", "Formulation trial and labelling"],
                supply: "Lined bags, drums or IBCs only for markets where the offered use is authorised.",
              },
              cta: { label: "Request an allulose review", href: ingredientQuoteHref("allulose") },
            },
            {
              id: "stevia",
              title: "Stevia",
              description: "A high-intensity sweetener based on a defined steviol glycoside profile.",
              image: "/media/products/starches-sweeteners/stevia-light-v2.webp",
              imageAlt: "Fine white stevia sweetener powder with restrained green stevia leaves",
              decisionSummary: {
                lead: "Best treated as a formulation ingredient: a small dosage can change sweetness, aftertaste and balance.",
                facts: [
                  { title: "Base / source", description: "Steviol glycoside extract or blend" },
                  { title: "Commercial form", description: "High-intensity powder" },
                  { title: "Typical fit", description: "Beverages, dairy and tabletop blends" },
                ],
                points: ["Glycoside profile", "Assay", "Taste target", "Solubility and destination approval"],
                supply: "Lined bags, cartons or drums by grade and concentration.",
              },
              cta: { label: "Request a stevia offer", href: ingredientQuoteHref("stevia") },
            },
          ],
        }}
        editorialFacts={{
          title: "Starches & Sweeteners Market Context",
          text: "2024 European industry snapshot, published by Starch Europe in 2026. These figures show the scale and product mix of the sector; they are not live price or A3 availability indicators.",
          sources: [
            { label: "Starch Europe — The European starch industry", href: "https://starch.eu/the-european-starch-industry/" },
            { label: "Starch Europe — Ingredients", href: "https://starch.eu/ingredients/" },
          ],
          items: [
            {
              metric: "22m",
              title: "Agricultural raw materials processed",
              description: "The European starch industry processes about 22 million tonnes of mainly EU-grown wheat, maize and starch potatoes, alongside smaller volumes of other crops.",
            },
            {
              metric: "9.8m",
              title: "Starch and derivatives produced",
              description: "Seventy facilities across 18 EU Member States produce about 9.8 million tonnes of starch and starch derivatives each year.",
            },
            {
              metric: "48%",
              title: "Starch sweeteners lead the product mix",
              description: "Starch sweeteners represent 48% of the 7.2 million tonnes consumed in the EU, compared with 34% native and 18% modified starches.",
            },
          ],
        }}
        shipmentOptions={{
          id: "integrated-value-chain",
          title: "Ingredient Matching & Supply Coordination",
          text: "The useful question is not simply which ingredient is available, but which grade will work in the recipe, process, market and delivery model.",
          image: "/media/products/starches-sweeteners/starch-service-application-stock-v1.webp",
          imageAlt: "Stainless steel processing tank in a clean industrial facility",
          items: [
            {
              title: "Application & Function Definition",
              description: "We clarify the finished product, target texture, sweetness, body, moisture control or protein performance, together with the relevant cooking, mixing, freezing or storage conditions.",
              image: "/media/products/starches-sweeteners/starch-service-application-stock-v1.webp",
              imageAlt: "Stainless steel processing tank in a clean industrial facility",
            },
            {
              title: "Ingredient & Grade Matching",
              description: "Botanical source, native or modified status, DE, assay, glycoside profile, solubility, viscosity, allergen and GMO requirements are compared as relevant to the ingredient.",
              image: "/media/products/starches-sweeteners/starch-service-matching-stock-v1.webp",
              imageAlt: "Wheat field extending toward large agricultural processing silos",
            },
            {
              title: "Quality, Regulatory & Sample Approval",
              description: "Supplier specification, COA, food-safety documents, destination authorisation, additive or novel-food status and any application trial are reviewed before commercial confirmation.",
              image: "/media/products/starches-sweeteners/starch-service-quality-stock-v1.webp",
              imageAlt: "Laboratory team examining samples during a quality review",
            },
            {
              title: "Packing, Handling & Delivery",
              description: "Powder, crystal, syrup or viscous-liquid handling is aligned with lined bags, big bags, drums, IBCs or bulk delivery, together with cleanliness, documentation and shipment milestones.",
              image: "/media/products/starches-sweeteners/starch-service-delivery-stock-v1.webp",
              imageAlt: "Cargo ship alongside a container terminal during delivery coordination",
            },
          ],
        }}
        related={starchesRelated}
        finalCta={{
          title: "For starches & sweeteners enquiries",
          text: "Share the ingredient, finished application, target performance, regulatory market, packing, volume, destination and shipment window with A3.",
          primary: { label: "Discuss an ingredient requirement", href: ingredientQuoteHref() },
          variant: "compact-reminder",
        }}
      />
    </>
  );
}
