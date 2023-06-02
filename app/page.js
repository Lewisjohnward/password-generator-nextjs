import Image from 'next/image'
import styles from './page.module.css'
import Generator from "./generator"

export default function Home() {
  return (
    <main className={styles.main}>
        <text className={styles.title}>
            Password Generator
        </text>
        <Generator />
    </main>
  )
}
