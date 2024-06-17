# Code and Cuisine

[Code and Cuisine](https://code-and-cuisine-ten.vercel.app/) is a React-Firebase application built with Vite. It allows merchants to create, edit, and manage their menu items efficiently. The app includes various features such as side navigation, search, filter, sort, image management, product printing, and deletion.

## Features

1. **Side Navigation**: For accessing the pages.
2. **Searching, Filtering, and Sorting**: 
   - Search items by name.
   - Filter by category and availability.
   - Sort by name, cost, amount, number of stocks, and discount.
3. **Add and View Image**: Upload and view product images.
4. **Printing Products**: Print the products' information.
5. **Deleting Products**: Remove products from the list.

## Usage

- `src/assets/`: Includes files needed such as the logo.
- `src/components/`: Custom components such as buttons, inputs, and modals.
- `src/forms/`: Layout for input forms.
- `src/layout/`: Structure layout of the application.
- `src/modals/`: CRUD functions of forms.
- `src/pages/`: Includes the pages.
- `themes/`: Color themes.

## Example Database Structure

```json
{
  "products": {
    "Crispy Pata": {
      "category": "Main Courses",
      "cost": "200.00",
      "discount": "25.00",
      "image": "https://firebasestorage.googleapis.com/v0/b/code-and-cuisine.appspot.com/o/products%2FCrispy%20Pata?alt=media",
      "name": "Crispy Pata",
      "options": {
        "0": "1-2 pax",
        "1": "3-5 pax",
        "2": "5-10 pax"
      },
      "price": "350.00",
      "stocks": 50
    }
  }
}
```

## Installed Modules
1. **Material UI**: For UI components and styling.
2. **Formik**: For building and managing forms.
3. **Yup**: For form validation.
4. **JS PDF**: For generating PDFs.


##Installation and Running

1. **Clone the Repository**

    ```bash
    git clone https://github.com/khylaehza/code-and-cuisine
    cd code-and-cuisine
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Run the Application**

    ```bash
    npm run dev
    ```

4. **Build for Production**

    ```bash
    npm run build
    ```

5. **Preview the Production Build**

    ```bash
    npm run serve
    ```

---

Made for Utak.PH's task.
