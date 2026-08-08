import { useEffect, useMemo, useRef, useState } from "react";
import { Text } from "react-native";

export default function LiveDateTime() {
  const [now, setNow] = useState(() => new Date());
  const mountedRef = useRef(false);
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    [],
  );

  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    [],
  );

  // useEffect(() => {
  //   let intervalId: ReturnType<typeof setInterval> | undefined;

  //   const updateTime = () => setNow(new Date());

  //   // Align updates with the start of each minute.
  //   const timeoutId = setTimeout(
  //     () => {
  //       updateTime();

  //       intervalId = setInterval(updateTime, 60_000);
  //     },
  //     60_000 - (Date.now() % 60_000),
  //   );

  //   return () => {
  //     clearTimeout(timeoutId);

  //     if (intervalId) {
  //       clearInterval(intervalId);
  //     }
  //   };
  // }, []);

  useEffect(() => {
    mountedRef.current = true;

    let intervalId: ReturnType<typeof setInterval> | undefined;

    const updateTime = () => {
      if (mountedRef.current) {
        setNow(new Date());
      }
    };

    const timeoutId = setTimeout(
      () => {
        updateTime();

        intervalId = setInterval(updateTime, 60_000);
      },
      60_000 - (Date.now() % 60_000),
    );

    return () => {
      mountedRef.current = false;

      clearTimeout(timeoutId);

      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);
  return (
    <Text className="text-lg font-bold text-slate-800 dark:text-slate-100">
      {dateFormatter.format(now)}, {timeFormatter.format(now).toUpperCase()}
    </Text>
  );
}
// import { useEffect, useState } from "react";
// import { Text } from "react-native";

// const dateFormatter = new Intl.DateTimeFormat("en-IN", {
//   day: "numeric",
//   month: "short",
//   year: "numeric",
// });

// const timeFormatter = new Intl.DateTimeFormat("en-IN", {
//   hour: "numeric",
//   minute: "2-digit",
//   hour12: true,
// });

// export default function LiveDateTime() {
//   const [now, setNow] = useState(() => new Date());

//   useEffect(() => {
//     let intervalId: ReturnType<typeof setInterval>;

//     const delay = 60_000 - (Date.now() % 60_000);

//     const timeoutId = setTimeout(() => {
//       setNow(new Date());

//       intervalId = setInterval(() => {
//         setNow(new Date());
//       }, 60_000);
//     }, delay);

//     return () => {
//       clearTimeout(timeoutId);
//       if (intervalId) clearInterval(intervalId);
//     };
//   }, []);

//   return (
//     <>
//       <Text className="text-lg font-bold text-slate-800 dark:text-white">
//         {dateFormatter.format(now)}, {timeFormatter.format(now).toUpperCase()}
//       </Text>
//     </>
//   );
// }
