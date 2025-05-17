export default function Input({error,...props}){
    return (
      <>
          <input {...props}/>
          <div className={`${error ? 'pb-4 pt-1' : 'pb-10 pt-1'}`}>
            {error && <p className="text-red-500/60 font-medium">{error}</p>}
          </div>
      </>
    )
}