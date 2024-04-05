import React, { useState } from "react";

const Loguoting = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    function handleLogout() {
        setIsAuthenticated(false);
        // Тут можно добавить логику для выхода пользователя из аккаунта
    }

    return (
        <div>
            {isAuthenticated && (
                <button onClick={handleLogout}>Выйти из аккаунта</button>
            )}
        </div>
    );
}

export default Loguoting;

