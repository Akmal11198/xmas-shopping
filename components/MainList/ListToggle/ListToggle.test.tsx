import { fireEvent, render, screen } from "@testing-library/react";
import { ListToggle } from ".";
import { AppContext } from "../../../context/AppContext";
import { usersData } from "../../../utils/data";
describe("Product Card", () => {
 const users=usersData;
 let curUser=0;
 const setCurUser=jest.fn();
  beforeEach(() => {
    render(
      <AppContext.Provider value={{ users,curUser,setCurUser }}>
        <ListToggle/>
      </AppContext.Provider>
    );
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  test("List Toggle renders", async () => {
    expect(screen.getByText(`${users[0].name.firstname}'s List`)).toBeInTheDocument();
    expect(screen.getByText(`${users[1].name.firstname}'s List`)).toBeInTheDocument();
  });

  test("List Toggle changes current user", async () => {
    const button = screen.getByText(`${users[1].name.firstname}'s List`);
    await fireEvent.click(button);
    expect(setCurUser).toBeCalledWith(1);
  });
});
