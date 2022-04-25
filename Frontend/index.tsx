import type { NextPage } from 'next'
import Banner from './components/Banner'


const Home: NextPage = () => {
  return (
    <section className='flex my-12 mx-[80px] font-poppins'>
    <Banner/>
    </section>
  )
}

export default Home
