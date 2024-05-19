import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

export default function MenuCategory({ items, title, image }) {
    return (
        <div className="pb-8">
            {title && <Cover image={image} title={title} />}
            <div className="grid md:grid-cols-2 gap-10 mt-16">
                {items?.map(item => (
                    <MenuItem key={item?._id} item={item}></MenuItem>
                ))}
            </div>
        </div>
    );
}
