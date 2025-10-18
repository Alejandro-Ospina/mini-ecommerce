interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer
      className={`bg-gradient-to-r from-yellow-400 to-yellow-300 text-black text-center py-6 mt-auto ${className}`}
    >
      <div className="flex flex-col sm:flex-row justify-center gap-6 font-medium">
        <a href="#">Contáctanos</a>
        <a href="#">Acerca de nosotros</a>
        <a href="#">Políticas de uso y tratamiento de datos</a>
      </div>
      <p className="mt-3 text-sm">
        © 2025 TiendaSpring. Todos los derechos reservados.
      </p>
    </footer>
  );
}
