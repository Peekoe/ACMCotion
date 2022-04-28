import type { NextPage } from 'next'
import {Banner} from './components/Banner'
import Instruction from './components/Instruction'



const Home: NextPage = () => {
  return (
    <section className='flex items-center flex-col my-12 mx-[80px] font-poppins'>
    <Banner/>
    <Instruction/>
    </section>
  )
}

export default Home
