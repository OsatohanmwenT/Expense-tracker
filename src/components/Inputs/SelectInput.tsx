import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import useCategories from "@/hooks/useCategories.tsx";

function SelectInput({ field }: { field: any }) {
  const { data, isLoading, isError, error } = useCategories();

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (isError) {
    return <div>Error loading categories: {error?.message}</div>;
  }

  return (
    <Select  onValueChange={field.onChange} value={field.value}>
      <SelectTrigger>
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent className="bg-black">
        <SelectGroup>
          <SelectLabel className="text-white">Category</SelectLabel>
          {data?.map((category) => (
            <SelectItem className="text-white capitalize" key={category.id} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
          <button className="text-white py-1 px-2 text-left capitalize rounded-md hover:bg-white w-full hover:text-black">other</button>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectInput;
