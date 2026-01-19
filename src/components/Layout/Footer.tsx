import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-100 text-gray-600 py-8 mt-16 border-t">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* 왼쪽: 로고 */}
        <Link to="/">
          <div className="flex w-[200px] items-center gap-2">
            <img
              src="/images/nol-b.gif"
              alt={t("footer.logoAlt")}
              className="w-[600px] object-contain"
            />
          </div>
        </Link>

        {/* 가운데: 카피라이트 및 이메일 */}
        <div className="text-center text-sm">
          <p>&copy; {t("footer.copyright")}</p>
          <p className="mt-1">
            {t("footer.contact")}:{" "}
            <a
              href="mailto:04mmii@naver.com"
              className="underline hover:text-gray-800"
            >
              04mmii@naver.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
