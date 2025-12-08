import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import RestaurantCard from "../components/RestaurantCard";
import { fetchRestaurants } from "../services/api";
import { Restaurant } from "../types";


export default function Home() {
const [q, setQ] = useState("");
const [list, setList] = useState<Restaurant[]>([]);
const [loading, setLoading] = useState(false);


useEffect(() => {
let mounted = true;
setLoading(true);
fetchRestaurants()
.then((data: Restaurant[]) => {
if (!mounted) return;
setList(data || []);
})
.catch(() => {
if (mounted) setList([]);
})
.finally(() => {
if (mounted) setLoading(false);
});
return () => { mounted = false; };
}, []);


const filtered = list.filter((r) => {
if (!q.trim()) return true;
const s = q.toLowerCase();
return (r.name || "").toLowerCase().includes(s) || (r.cuisines || []).join(" ").toLowerCase().includes(s);
});


return (
<div className="page">
<SearchBar value={q} onChange={setQ} />


{loading ? (
<p>Loading...</p>
) : (
<div className="grid">
{filtered.map((r, i) => (
<RestaurantCard key={r._id || `${r.name}-${i}`} restaurant={r} />
))}
</div>
)}
</div>
);
}