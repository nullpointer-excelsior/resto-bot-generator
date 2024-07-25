import CreateMenuRestaurant from '@/components/menu/CreateRestaurantMenu';


export default function Page() {
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Configurar Bot de Restaurante</h2>
      <CreateMenuRestaurant />
    </div>
  );
};
