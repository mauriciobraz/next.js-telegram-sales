import { atom } from "recoil";

export type APIProduct = {
  id: string;

  category_id: string;
  category_name: string;

  title: string;
  description: string;

  rating: string;
  services: APIService[];
};

export type APIService = {
  id: number;
  category_id: string;
  category_name: string;

  title: string;
  description: string;

  price: number;
  quantity: number;
  is_active: boolean;
};

const productsAtom = atom<APIProduct[] | null>({
  key: "productsAtom",
  default: [
    {
      id: "6BA41B",
      category_id: "6BA41B",
      category_name: "Milk",
      title: "Milk",
      description: "Milks and related products",
      rating: "4.28",
      services: [
        {
          id: 1,
          category_id: "6BA41B",
          category_name: "Milk",
          title: "Milk - 100ml",
          description:
            "🥛 Small but mighty! Get your daily dose of calcium with our 100ml milk. Perfect for a quick energy boost! 😋 💪 Purchase now!",
          price: 1,
          quantity: 3,
          is_active: true,
        },
        {
          id: 2,
          category_id: "6BA41B",
          category_name: "Milk",
          title: "Milk - 250ml",
          description:
            "🥛 On-the-Go Delight! Enjoy our 250ml milk for a refreshing drink and a daily calcium boost! 🏃‍♂️ Purchase now!",
          price: 2,
          quantity: 19,
          is_active: false,
        },
        {
          id: 3,
          category_id: "6BA41B",
          category_name: "Milk",
          title: "Milk - 500ml",
          description:
            "Got milk? Fuel up your day with our 500ml milk. Rich in nutrients and perfect for breakfast or a snack! 🌞 🥛 Purchase now!",
          price: 3,
          quantity: 2,
          is_active: true,
        },
        {
          id: 4,
          category_id: "6BA41B",
          category_name: "Milk",
          title: "Milk - 1000ml",
          description:
            "🥛 Nutrient Powerhouse! Stock up on our 1000ml milk for a strong and healthy start to your day! 💪 Purchase now!",
          price: 4,
          quantity: 8,
          is_active: true,
        },
      ],
    },
    {
      id: "0831CE",
      category_id: "0831CE",
      category_name: "Chocolate Bars",
      title: "Chocolate Bars",
      description: "Chocolate Barss and related products",
      rating: "3.74",
      services: [
        {
          id: 5,
          category_id: "0831CE",
          category_name: "Chocolate Bars",
          title: "Chocolate Bars - 1 bar",
          description:
            "🍫 Heavenly Bite! Savor our 1 bar of chocolate for an irresistible taste of pure indulgence! 😍 Purchase now!",
          price: 1,
          quantity: 13,
          is_active: false,
        },
        {
          id: 6,
          category_id: "0831CE",
          category_name: "Chocolate Bars",
          title: "Chocolate Bars - 2 bars",
          description:
            "🍫 Double the Love! Share our 2 bars of chocolate with someone special, or keep them all to yourself! 😉 Purchase now!",
          price: 2,
          quantity: 16,
          is_active: false,
        },
        {
          id: 7,
          category_id: "0831CE",
          category_name: "Chocolate Bars",
          title: "Chocolate Bars - 3 bars",
          description:
            "🍫 Triple Treat! Delight in our 3 bars of chocolate for an unforgettable taste experience! 🍫 Purchase now!",
          price: 3,
          quantity: 5,
          is_active: true,
        },
        {
          id: 8,
          category_id: "0831CE",
          category_name: "Chocolate Bars",
          title: "Chocolate Bars - 4 bars",
          description:
            "🍫 Choco Fest! Enjoy our 4 bars of chocolate and celebrate the sweet life with friends and family! 🎉 Purchase now!",
          price: 4,
          quantity: 13,
          is_active: false,
        },
      ],
    },
    {
      id: "D5577D",
      category_id: "D5577D",
      category_name: "Donuts",
      title: "Donuts",
      description: "Donutss and related products",
      rating: "3.02",
      services: [
        {
          id: 9,
          category_id: "D5577D",
          category_name: "Donuts",
          title: "Donuts - 6 pack",
          description:
            "🍩 Donut Worry, Be Happy! Share the joy with our 6-pack of delicious donuts! 😁 Purchase now!",
          price: 5,
          quantity: 19,
          is_active: false,
        },
        {
          id: 10,
          category_id: "D5577D",
          category_name: "Donuts",
          title: "Donuts - 12 pack",
          description:
            "🍩 Donut Fiesta! Make every gathering extra special with our delightful 12-pack of donuts! 🎉 Purchase now!",
          price: 8,
          quantity: 4,
          is_active: true,
        },
        {
          id: 11,
          category_id: "D5577D",
          category_name: "Donuts",
          title: "Donuts - 24 pack",
          description:
            "🍩 Donut Overload! Indulge in our 32-pack of donuts for all your sweet cravings! 🍩 Purchase now!",
          price: 12,
          quantity: 1,
          is_active: true,
        },
        {
          id: 12,
          category_id: "D5577D",
          category_name: "Donuts",
          title: "Donuts - 48 pack",
          description:
            "🍩 Donut Party! Treat everyone to our mouthwatering 48-pack of donuts for a celebration to remember! 🥳 Purchase now!",
          price: 20,
          quantity: 16,
          is_active: false,
        },
      ],
    },
  ],
});

export default productsAtom;
