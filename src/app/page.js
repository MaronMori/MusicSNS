import {Menu} from "@/app/components/menu";
import {Posts} from "@/app/components/posts";

export default function Home() {
  return (
    <main>
        <div className="grid grid-cols-3">
            <Menu />
            <Posts />
            <section className="container">iii</section>
        </div>
    </main>
  )
}
