import React, { useState } from "react";
import Otp from "./Otp";
import { useTranslation } from "react-i18next";

const LoginTab = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  const { t } = useTranslation();
  return (
    <div className="flex items-center bg-gradient-to-br">
      <div className="max-w-3xl mx-auto px-8 sm:px-0">
        <div className="sm:w-7/12 sm:mx-auto flex flex-col justify-center items-center">
          <div className="relative w-max mx h-12 grid grid-cols-2 justify-items-center items-center px-[3px] rounded-full bg-blue-100 overflow-hidden shadow-lg shadow-900/20 transition">
            {/* <div className='absolute h-11 my-auto top-0 bottom-0 left-0 rounded-full bg-white shadow-md'></div> */}
            <div>
              <button
                // tried to make this button active by default, not working will see later
                className={
                  "active:bg-blue-500 active focus:outline-none focus:bg-blue-500 relative block h-10 px-6 rounded-full"
                }
                onClick={() => toggleTab(1)}
              >
                <span className="text-lg font-serif">{t("Patient")}</span>
              </button>
            </div>
            <div>
              <button
                className={
                  "active:bg-blue-800 focus:outline-none focus:bg-blue-700 relative block h-10 px-6 rounded-full"
                }
                onClick={() => toggleTab(2)}
              >
                <span className="text-lg font-serif">{t("Doctor")}</span>
              </button>
            </div>
          </div>
          <div className="mt-0 relative">
            {toggleState === 1 ? (
              <div className="tab-panel p-6 transition duration-300">
                {/* <h2 className="text-xl font-semibold text-gray-800">second tab panel</h2> */}
                <Otp value = {toggleState}/>
                <div className="flex items-center justify-center pb-6">
                  <p className="mb-0 mr-2">{t("Don't have an account?")}</p>
                  {/* <button
                                        type="button"
                                        className="inline-block rounded-full border-2 px-6 pb-[6px] pt-2 text-xs font-serif font-bold uppercase leading-normal hover:bg-purple-100 transform transition duration-300 hover:scale-110"
                                    >
                                        Register
                                    </button> */}

                  <a
                    href="/register"
                    className="text-blue-500 hover:text-blue-900"
                  >
                    {t("Register")}

                  </a>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            {toggleState === 2 ? (
              <div className="opacity-100 tab-panel p-6 transition duration-300">
                {/* <h2 className="text-xl font-semibold text-gray-800">third tab panel</h2> */}
                <Otp value={toggleState} />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginTab;
