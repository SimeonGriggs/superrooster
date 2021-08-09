// Create our number formatter.
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default {
  name: "menuItem",
  title: "Menu item",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "type",
      title: "Type",
      type: "string",
      initialValue: "main",
      options: {
        layout: "radio",
        list: [
          { value: "main", title: "Main" },
          { value: "side", title: "Side" },
        ],
      },
    },
    {
      name: "price",
      title: "Price",
      description: "Enter price in Cents",
      type: "number",
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
    },
  ],
  preview: {
    select: {
      title: "title",
      type: "type",
      price: "price",
      media: "image",
    },
    prepare({ title, type, price, media }) {
      return {
        title: `${title}`,
        subtitle: formatter.format(price / 100),
        media,
      };
    },
  },
};
