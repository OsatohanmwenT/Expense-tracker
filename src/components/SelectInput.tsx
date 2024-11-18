import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCategories from "@/hooks/useCategories";

function SelectInput({ field }: { field: any }) {
  const { data, isLoading, isError, error } = useCategories();

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (isError) {
    return <div>Error loading categories: {error?.message}</div>;
  }

  return (
    <Select onValueChange={field.onChange} value={field.value}>
      <SelectTrigger>
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          {data?.map((category) => (
            <SelectItem key={category.id} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectInput;
