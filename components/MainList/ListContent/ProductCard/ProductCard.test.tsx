import { fireEvent, render, screen } from "@testing-library/react";
import { ProductCard } from ".";
import { AppContext } from "../../../../context/AppContext";
import { item } from "../../../../utils/data";
describe("Product Card", () => {
  const addToCart = jest.fn();
  const removeFromCart = jest.fn();
  const inCart = jest.fn();
  inCart.mockReturnValueOnce(false)
  .mockReturnValueOnce(false)
  .mockReturnValue(true);
  beforeEach(() => {
    render(
      <AppContext.Provider value={{ addToCart, inCart,removeFromCart }}>
        <ProductCard item={item} />
      </AppContext.Provider>
    );
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  test("Product Card renders", async () => {
    expect(screen.getByText(item.product.title)).toBeInTheDocument();
    expect(screen.getByText(item.product.category)).toBeInTheDocument();
    expect(screen.getByText("Add To Cart")).toBeInTheDocument();
  });

  test("Product Card added to cart", async () => {
    const button = screen.getByText("Add To Cart");
    await fireEvent.click(button);
    expect(addToCart).toBeCalledWith(item);
  });

  test("Product Card removed from cart", async () => {
    expect(screen.getByText("Added To Cart")).toBeInTheDocument();
    expect(screen.getByText("Remove")).toBeInTheDocument();
    const button = screen.getByText("Remove");
    await fireEvent.click(button);
    expect(removeFromCart).toBeCalledWith(item);
  });
});
