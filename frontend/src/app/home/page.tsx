import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <section className={styles.presentation}>
        <h1>Expresa. Conecta. Crea con alma</h1>
        <div className={styles.content}>
          <div className={styles.text}>
            <p>BTOP.AI es un espacio para crear desde el corazón, aunque nunca antes te hayas atrevido.
              Aquí no necesitas conocimientos técnicos, solo permitirte sentir y compartirlo con las personas que quieres.
            </p>
            <h2>Porque tu voz tiene valor y tus emociones merecen ser contadas...</h2>
          </div>
          <div className={styles.image}>
            <Image
              alt="presentation image"
              src="https://res.cloudinary.com/btopai/image/upload/v1762276377/btop/uploads/presentation.png"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 30vw"
              />
          </div>
        </div>
        <Link className={styles.access} href="/shorts">Empieza a crear gratis</Link>
      </section>
      <section className={styles.introduction}>
        <div className={styles.steps}>
          <h2>Sigue 3 simples pasos</h2>
          <div className={styles.content}>
            <div className={styles.item}>
              <div className={styles.frame}>
                <Image 
                  alt="Escoge plantilla" 
                  src="https://res.cloudinary.com/btopai/image/upload/v1762281888/btop/uploads/chose_template.png"
                  fill
                />
              </div>
              <p>Escoge plantilla</p>
            </div>
            <div className={styles.item}>
              <div className={styles.frame}>
                <Image 
                  alt="Contesta unas preguntas y personaliza con inteligencia artificial" 
                  src="https://res.cloudinary.com/btopai/image/upload/v1762281890/btop/uploads/customize_ia.png"
                  fill
                />
              </div>
              <p>Contesta unas preguntas y personaliza con inteligencia artificial</p>
            </div>
            <div className={styles.item}>
              <div className={styles.frame}>
                <Image 
                  alt="Comparte tu regalo" 
                  src="https://res.cloudinary.com/btopai/image/upload/v1762281893/btop/uploads/share_content.png"
                  fill
                />
              </div>
              <p>Comparte tu regalo</p>
            </div>
          </div>
        </div>
        <div className={styles.video}>VIDEO</div>
      </section>
      <section className={styles.popular}>
        <h2>Btop shorts populares</h2>
        <ul className={styles.carrousel}>
          <li className={styles.item}>
            <div className={styles.frame}>
              <Image 
                alt="Un regalo para mamá"
                src="https://res.cloudinary.com/btopai/image/upload/v1762283071/btop/uploads/mom_gift.jpg"
                fill
                
              />
            </div>
            <div className={styles.content}>
              <div>
                <h3>Un regalo para mamá</h3>
                <p>Dale a tu madre ese regalo desde el corazón</p>
              </div>
              <Link className={styles.start} href="https://btop-nu.vercel.app/">Empezar</Link>
            </div>
          </li>
          <li className={styles.item}>
            <div className={styles.frame}>
              <Image 
                alt="Ánimos equipo"
                src="https://res.cloudinary.com/btopai/image/upload/v1762283076/btop/uploads/cheer_team.png"
                fill
              />
            </div>
            <div className={styles.content}>
              <div>
                <h3>Ánimos equipo</h3>
                <p>Arrancale una sonrisa a tu amado/a</p>
              </div>
              <Link className={styles.start} href="#">Empezar</Link>
            </div>
          </li>
          <li className={styles.item}>
            <div className={styles.frame}>
              <Image 
                alt="Gracias por venir"
                src="https://res.cloudinary.com/btopai/image/upload/v1762283079/btop/uploads/cute_message.png"
                fill
              />
            </div>
            <div className={styles.content}>
              <div>
                <h3>Gracias por venir</h3>
                <p>Arrancale una sonrisa a tu amado/a</p>
              </div>
              <Link className={styles.start} href="#">Empezar</Link>
            </div>
          </li>
          <li className={styles.item}>
            <div className={styles.frame}>
              <Image 
                alt="Romantic mood"
                src="https://res.cloudinary.com/btopai/image/upload/v1762283082/btop/uploads/party_memory.png"
                fill
              />
            </div>
            <div className={styles.content}>
              <div>
                <h3>Romantic mood</h3>
                <p>Arrancale una sonrisa a tu amado/a</p>
              </div>
              <Link className={styles.start} href="#">Empezar</Link>
            </div>
          </li>
        </ul>
      </section>
    </main>
  );
}
