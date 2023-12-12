import { basename } from "../../lib/path.js";

export function getFilename() {
    return basename(getCurrentPath()) || "untitled.dat";
}

export function getDownloadUrl() {
    return "/api/files/cat?path=" + getCurrentPath().replace(/%23/g, "#");
}

export function getCurrentPath() {
    return decodeURIComponent(location.pathname.replace("/view", "") + (location.hash || ""));
}

// function prepare(path) {
//     return encodeURIComponent(decodeURIComponent(path.replace(/%/g, "%25")));
// }

function appendShareToUrl() {
    // TODO
}
