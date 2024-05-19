import Card from "../../../components/Card/Card";

export default function OrderTab({ items }) {
    return (
        <div className="grid md:grid-cols-3 gap-10">
            {items?.map(item => (
                <Card key={item?._id} item={item}></Card>
            ))}
        </div>
    );
}
