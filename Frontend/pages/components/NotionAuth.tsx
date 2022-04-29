import Image from "next/image";
import React from "react";
import Notion from "../../assets/notion.svg";

 const NotionAuthButton: React.FC = () => {
     return (
         <div>
             <button type="button" className="w-[15em] hover:bg-pink-200 transition-all duration-300 flex justify-center items-center gap-3 bg-white p-2 rounded-lg mb-12" onClick={(e) => {
                 e.preventDefault();
                 window.location.href='https://api.notion.com/v1/oauth/authorize?owner=user&client_id=7e82f198-4aba-4022-bf2a-f16ec5a791f3&redirect_uri=http://localhost:3000&response_type=code';
                 }}>
                         <div className="w-[32px] h-[32px]">
                         <Image src={Notion} alt="Notion logo"/>
                         </div>
             Login with Notion
             </button>
         </div>
     );
 };

 export default NotionAuthButton; 