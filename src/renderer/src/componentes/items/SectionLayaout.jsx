function SectionLayaout({ children, className }) {
  return (
    <section className={`bg-black/60 mt-4 p-5 px-8 rounded-lg  ${className}`}>{children}</section>
  )
}

export default SectionLayaout

export function LabelItem({ label, dataLabel }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <h3 className="font-semibold">{label} :</h3>
      <span>{dataLabel ?? '!Error'}</span>
    </div>
  )
}
