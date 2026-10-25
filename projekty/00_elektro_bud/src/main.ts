// Wyszukanie produktu po EAN lub nazwie i pokazanie lokalizacji.
type Product = {
  ean: string;
  name: string;
  category: string;
  sector: string;
  rack: string;
  shelf: string;
};

const products: Product[] = [ // Dostępne produkty
  { ean: "5901234123457", name: "Kabel instalacyjny YDY 3x1.5", category: "Kable", sector: "S1", rack: "R2", shelf: "P1" },
  { ean: "5901234123468", name: "Gniazdo podwójne białe", category: "Osprzęt elektryczny", sector: "S1", rack: "R1", shelf: "P3" },
  { ean: "5901234123477", name: "Żarówka LED E27 10 W", category: "Oświetlenie", sector: "S2", rack: "R3", shelf: "P2" }
];

function getElement<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (element === null) {
    throw new Error("Nie znaleziono elementu strony: " + selector);
  }
  return element;
}

const searchForm = getElement<HTMLFormElement>("#searchForm");
const searchInput = getElement<HTMLInputElement>("#searchInput");
const message = getElement<HTMLElement>("#message");
const result = getElement<HTMLElement>("#result");
const resultName = getElement<HTMLElement>("#resultName");
const resultEan = getElement<HTMLElement>("#resultEan");
const resultCategory = getElement<HTMLElement>("#resultCategory");
const resultLocation = getElement<HTMLElement>("#resultLocation");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchProduct();
});

function searchProduct(): void {
  const query = searchInput.value.trim().toLocaleLowerCase("pl");
  result.hidden = true;

  if (query === "") {
    message.textContent = "Wpisz kod EAN lub nazwę produktu.";
    return;
  }

  const product = products.find((item) =>
    item.ean.includes(query) || item.name.toLocaleLowerCase("pl").includes(query)
  );

  if (product === undefined) {
    message.textContent = "Nie znaleziono produktu.";
    return;
  }

  resultName.textContent = product.name;
  resultEan.textContent = product.ean;
  resultCategory.textContent = product.category;
  resultLocation.textContent = `${product.sector} / ${product.rack} / ${product.shelf}`;
  message.textContent = "Znaleziono produkt.";
  result.hidden = false;
}
