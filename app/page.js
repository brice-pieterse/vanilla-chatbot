import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <p style={{textAlign: 'left', width: '30%', fontSize: 16, fontWeight: 400, marginBottom: 20 }}>Reactive VanillaJS chatbot</p>
      <p style={{textAlign: 'left', width: '30%', fontSize: 13, lineHeight: '17px', fontWeight: 400}}>Easily configurable chatbot component written in vanilla JS that can be dropped in as a script tag in any website. It uses reactivity to update DOM elements and replicates how a typical react component would function.</p>
    </main>
  )
}
