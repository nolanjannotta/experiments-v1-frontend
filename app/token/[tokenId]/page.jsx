"use server"

import { getFrameMetadata } from '@coinbase/onchainkit';
import { contract,publicClient } from "../../contract_server";
import Stats from "./Stats"
import sharp from "sharp";
// import {FRAME_URL} from "@/app/constants.js";
import { artAddress } from '@/app/constants.js';
// import useTruncateAddress from "../../../hooks/useTruncateAddress"
import {baseScanUrl} from "@/app/constants.js"
import Moralis from "moralis";
import { base } from 'viem/chains';

await Moralis.start({apiKey: process.env.NEXT_PUBLIC_MORALIS_KEY});



async function tokenData(tokenId) {
  try{
    // const uri = await contract.read.tokenURI([tokenId]);
    const uri = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAwIDEwMDAiIGhlaWdodD0iMTAwMCIgd2lkdGg9IjEwMDAiPg0KCTxyZWN0IHdpZHRoPSIxMDAwIiBoZWlnaHQ9IjEwMDAiIGZpbGw9IiNmZmZmZmYiIC8+DQoJPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAtNTApIj4NCgkJPHJlY3QgeD0iMTM1LjUiIHk9Ijc1IiB3aWR0aD0iNzI5IiBoZWlnaHQ9Ijg1MCIgZmlsbD0id2hpdGUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMjAiIC8+DQoJCTxyZWN0IHg9IjI3MCIgeT0iMjE1IiB3aWR0aD0iNDYwIiBoZWlnaHQ9IjU3MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgLz4NCgkJPGcgbGV0dGVyLXNwYWNpbmc9Ii0yIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iYm9sZCI+DQoJCQk8dGV4dCB4PSIyMTAiIHk9IjIwMCIgZm9udC1zaXplPSIxMDBweCIgdHJhbnNmb3JtPSJza2V3WCgzMCkiPg0KCQkJCVhJDQoJCQk8L3RleHQ+DQoJCQk8dGV4dCB4PSI1MDAiIHk9IjIwMCIgZm9udC1zaXplPSIxMDBweCI+DQoJCQkJWElJDQoJCQk8L3RleHQ+DQoJCQk8dGV4dCB4PSI3ODgiIHk9IjIwMCIgZm9udC1zaXplPSIxMDBweCIgdHJhbnNmb3JtPSJza2V3WCgtMzApIj4NCgkJCQlJDQoJCQk8L3RleHQ+DQoJCQk8dGV4dCB4PSIyMTAiIHk9IjIwMCIgZm9udC1zaXplPSIxMDBweCIgdHJhbnNmb3JtPSJza2V3WCgtMzApIHJvdGF0ZSgxODAgNTAwIDUwMCkiPg0KCQkJCVZJSQ0KCQkJPC90ZXh0Pg0KCQkJPHRleHQgeD0iNTAwIiB5PSIyMDAiIGZvbnQtc2l6ZT0iMTAwcHgiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MDAgNTAwKSI+DQoJCQkJVkkNCgkJCTwvdGV4dD4NCgkJCTx0ZXh0IHg9Ijc4OCIgeT0iMjAwIiBmb250LXNpemU9IjEwMHB4IiB0cmFuc2Zvcm09InNrZXdYKDMwKSByb3RhdGUoMTgwIDUwMCA1MDApIj4NCgkJCQlWDQoJCQk8L3RleHQ+DQoJCQk8dGV4dCB4PSI3ODUiIHk9IjI1NSIgZm9udC1zaXplPSIxMDBweCIgdHJhbnNmb3JtPSJza2V3WSgtMzApIHJvdGF0ZSg5MCA1MDAgNTAwKSAiPg0KCQkJCUlJDQoJCQk8L3RleHQ+DQoJCQk8dGV4dCB4PSI1MDAiIHk9IjI1NSIgZm9udC1zaXplPSIxMDBweCIgdHJhbnNmb3JtPSJyb3RhdGUoOTAgNTAwIDUwMCkiPg0KCQkJCUlJSQ0KCQkJPC90ZXh0Pg0KCQkJPHRleHQgeD0iMjEwIiB5PSIyNTUiIGZvbnQtc2l6ZT0iMTAwcHgiIHRyYW5zZm9ybT0iIHNrZXdZKDMwKSByb3RhdGUoOTAgNTAwIDUwMCkgIj4NCgkJCQlJSUlJDQoJCQk8L3RleHQ+DQoJCQk8dGV4dCB4PSI3OTAiIHk9IjI1NSIgZm9udC1zaXplPSIxMDBweCIgdHJhbnNmb3JtPSJza2V3WSgzMCkgcm90YXRlKC05MCA1MDAgNTAwKSI+DQoJCQkJWA0KCQkJPC90ZXh0Pg0KCQkJPHRleHQgeD0iNTAwIiB5PSIyNTUiIGZvbnQtc2l6ZT0iMTAwcHgiIHRyYW5zZm9ybT0icm90YXRlKC05MCA1MDAgNTAwKSI+DQoJCQkJSVgNCgkJCTwvdGV4dD4NCgkJCTx0ZXh0IHg9IjE5NSIgeT0iMjU1IiBmb250LXNpemU9IjEwMHB4IiB0cmFuc2Zvcm09InNrZXdZKC0zMCkgcm90YXRlKC05MCA1MDAgNTAwKSI+DQoJCQkJVklJSQ0KCQkJPC90ZXh0Pg0KCQk8L2c+DQoJCTxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI3NSwyNzUpIHNjYWxlKC40NSkiPg0KICAgICAgICA8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgaGVpZ2h0PSIxMDAwIiB3aWR0aD0iMTAwMCI+PHJlY3Qgd2lkdGg9IjEwMDAiIGhlaWdodD0iMTAwMCIgZmlsbD0iI2ZmZmZmZiIvPjxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHBvaW50cz0iMzUsNDAgOTY4LDM5IDk3MCw5NTkgNDEsOTc0ICIvPjxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHBvaW50cz0iNjEsNjIgMTUyLDU5IDE1Miw4NzMgNzIsODczICIvPjxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHBvaW50cz0iOTQsOTggMTI3LDk4IDEyNCwyNjYgOTEsMjY5ICIvPjxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHBvaW50cz0iMTAyLDMyOSAxMjQsMzI1IDEyMyw4NTQgOTYsODU0ICIvPjxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHBvaW50cz0iMjIzLDcwIDkyOSw2NyA5MjcsODgyIDIxNSw4ODAgIi8+PHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgcG9pbnRzPSIyNDgsMTAxIDI1MiwxMDIgMjY0LDg1MCAyNTEsODUyICIvPjxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHBvaW50cz0iMzIzLDk5IDkwOSwxMDIgOTEwLDM4NCAzMTQsMzc5ICIvPjxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHBvaW50cz0iMzQxLDE3MyA4NzEsMTY4IDg3MCwzNDggMzQ3LDM1MSAiLz48cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBwb2ludHM9IjM3MCwxOTIgNjU4LDE5MiA2NTksMzA0IDM2NywyOTkgIi8+PHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgcG9pbnRzPSI0MDMsMjQ5IDU2MCwyNDggNTU3LDI3NSAzOTQsMjc3ICIvPjxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHBvaW50cz0iNjE0LDI1MyA2MzgsMjQ4IDYzNCwyODIgNjE0LDI3MiAiLz48cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBwb2ludHM9IjcxOCwxOTUgODUwLDE5NCA4NTMsMzA0IDcxNywyOTUgIi8+PHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgcG9pbnRzPSI3NDMsMjMzIDgxMywyMzYgODE3LDI4MSA3MzMsMjc4ICIvPjxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHBvaW50cz0iMzIwLDQ0NCA5MDcsNDM2IDg5OCw4NTAgMzE0LDg0MyAiLz48cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBwb2ludHM9IjcxMiw0NjQgODcwLDQ2OCA4NzQsODE3IDcwNSw4MTMgIi8+PHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgcG9pbnRzPSI3MjgsNDk5IDg0Niw0OTAgODQ0LDc4OCA3MjcsNzkxICIvPjxwb2x5Z29uIHN0cm9rZT0iYmxhY2siIGZpbGw9InJnYmEoMTA0LCA0NiwgMjQ1LCAuNikiIHBvaW50cz0iNzU1LDUyMyA3ODksNTI1IDc5NSw1NDQgNzU3LDU0OCAiLz48cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBwb2ludHM9Ijc1NCw1OTcgNzk5LDU5NiA3OTUsNzU5IDc1MCw3NjEgIi8+PHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgcG9pbnRzPSIzNTEsNDY0IDY1Niw0NzMgNjUzLDYyNCAzNDcsNjIyICIvPjxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHBvaW50cz0iNDcwLDQ5OCA2MTcsNTAxIDYyOSw1OTcgNDYwLDYwMiAiLz48cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBwb2ludHM9IjQ5Miw1MjMgNTk1LDUyNCA2MDAsNTgwIDQ5Myw1NzMgIi8+PHBvbHlnb24gc3Ryb2tlPSJibGFjayIgZmlsbD0icmdiYSg2NCwgODIsIDg2LCAuNikiIHBvaW50cz0iMzY5LDUyMSA0MTcsNTIyIDQxNSw1OTYgMzcyLDU5NyAiLz48cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBwb2ludHM9IjM0NSw2ODAgNjQzLDY4MSA2NDgsODI0IDM1MCw4MTMgIi8+PHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgcG9pbnRzPSIzNzYsNzA3IDYyOCw3MTIgNjI2LDc2NyAzNzcsNzYzICIvPjxwYXRoIHN0cm9rZT0icmdiKDMwLCAzMCwgMzApIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDg2OCA4OTMpc2NhbGUoLjEpIiBkPSJNNTAgNDQ0UzI4OCA2MjQsIDIyMiA0ODdTMzI4IDQ4NSwgMzgwIDQyMFM1NjYgNTgxLCAzODcgNDAwUzU3MCA0ODYsIDk1MCA1MjQiLz48L3N2Zz4NCg0KICAgICAgICA8L2c+DQogICAgICAgIA0KICAgICAgICA8cG9seWdvbiBwb2ludHM9IjQ5Nyw1MDAgNDg1LDE5NSA1MDAsMTgwIDUxNSwxOTUgNTAzLDUwMCIgZmlsbD0iYmxhY2siIHRyYW5zZm9ybT0icm90YXRlKDMyMyA1MDAgNTAwKSAiPg0KCQkJPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGR1cj0iMzYwMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBmcm9tPSIzMjMgNTAwIDUwMCIgdG89IjY4MyA1MDAgNTAwIiAvPg0KCQk8L3BvbHlnb24+DQoJCTxwb2x5Z29uIHBvaW50cz0iNDk2LDUwMCA0ODAsMjk1IDUwMCwyNzUgNTIwLDI5NSA1MDQsNTAwIiBmaWxsPSJibGFjayIgdHJhbnNmb3JtPSJyb3RhdGUoMjk2IDUwMCA1MDApICI+DQoJCQk8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgZHVyPSI0MzIwMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBmcm9tPSIyOTYgNTAwIDUwMCIgdG89IjY1NiA1MDAgNTAwIiAvPg0KCQk8L3BvbHlnb24+DQoJCTxjaXJjbGUgcj0iMTUiIGZpbGw9ImJsYWNrIiBjeD0iNTAwIiBjeT0iNTAwIiAvPg0KCTwvZz4NCgk8dGV4dCB4PSI1MDAiIHk9Ijk4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI2MHB4IiBmb250LXdlaWdodD0iYm9sZCI+DQoJCWhlbGxvb29vb28gZnJhbWUNCgk8L3RleHQ+DQo8L3N2Zz4NCg0KDQoNCjwhLS0gPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAwIDEwMDAiIGhlaWdodD0iMTAwMCIgd2lkdGg9IjEwMDAiPjxyZWN0IHdpZHRoPSIxMDAwIiBoZWlnaHQ9IjEwMDAiIGZpbGw9IiNmZmZmZmYiLz48cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBwb2ludHM9IjM1LDQwIDk2OCwzOSA5NzAsOTU5IDQxLDk3NCAiLz48cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBwb2ludHM9IjYxLDYyIDE1Miw1OSAxNTIsODczIDcyLDg3MyAiLz48cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBwb2ludHM9Ijk0LDk4IDEyNyw5OCAxMjQsMjY2IDkxLDI2OSAiLz48cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBwb2ludHM9IjEwMiwzMjkgMTI0LDMyNSAxMjMsODU0IDk2LDg1NCAiLz48cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBwb2ludHM9IjIyMyw3MCA5MjksNjcgOTI3LDg4MiAyMTUsODgwICIvPjxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHBvaW50cz0iMjQ4LDEwMSAyNTIsMTAyIDI2NCw4NTAgMjUxLDg1MiAiLz48cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBwb2ludHM9IjMyMyw5OSA5MDksMTAyIDkxMCwzODQgMzE0LDM3OSAiLz48cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBwb2ludHM9IjM0MSwxNzMgODcxLDE2OCA4NzAsMzQ4IDM0NywzNTEgIi8+PHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgcG9pbnRzPSIzNzAsMTkyIDY1OCwxOTIgNjU5LDMwNCAzNjcsMjk5ICIvPjxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHBvaW50cz0iNDAzLDI0OSA1NjAsMjQ4IDU1NywyNzUgMzk0LDI3NyAiLz48cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBwb2ludHM9IjYxNCwyNTMgNjM4LDI0OCA2MzQsMjgyIDYxNCwyNzIgIi8+PHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgcG9pbnRzPSI3MTgsMTk1IDg1MCwxOTQgODUzLDMwNCA3MTcsMjk1ICIvPjxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHBvaW50cz0iNzQzLDIzMyA4MTMsMjM2IDgxNywyODEgNzMzLDI3OCAiLz48cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBwb2ludHM9IjMyMCw0NDQgOTA3LDQzNiA4OTgsODUwIDMxNCw4NDMgIi8+PHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgcG9pbnRzPSI3MTIsNDY0IDg3MCw0NjggODc0LDgxNyA3MDUsODEzICIvPjxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHBvaW50cz0iNzI4LDQ5OSA4NDYsNDkwIDg0NCw3ODggNzI3LDc5MSAiLz48cG9seWdvbiBzdHJva2U9ImJsYWNrIiBmaWxsPSJyZ2JhKDEwNCwgNDYsIDI0NSwgLjYpIiBwb2ludHM9Ijc1NSw1MjMgNzg5LDUyNSA3OTUsNTQ0IDc1Nyw1NDggIi8+PHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgcG9pbnRzPSI3NTQsNTk3IDc5OSw1OTYgNzk1LDc1OSA3NTAsNzYxICIvPjxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHBvaW50cz0iMzUxLDQ2NCA2NTYsNDczIDY1Myw2MjQgMzQ3LDYyMiAiLz48cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBwb2ludHM9IjQ3MCw0OTggNjE3LDUwMSA2MjksNTk3IDQ2MCw2MDIgIi8+PHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgcG9pbnRzPSI0OTIsNTIzIDU5NSw1MjQgNjAwLDU4MCA0OTMsNTczICIvPjxwb2x5Z29uIHN0cm9rZT0iYmxhY2siIGZpbGw9InJnYmEoNjQsIDgyLCA4NiwgLjYpIiBwb2ludHM9IjM2OSw1MjEgNDE3LDUyMiA0MTUsNTk2IDM3Miw1OTcgIi8+PHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgcG9pbnRzPSIzNDUsNjgwIDY0Myw2ODEgNjQ4LDgyNCAzNTAsODEzICIvPjxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHBvaW50cz0iMzc2LDcwNyA2MjgsNzEyIDYyNiw3NjcgMzc3LDc2MyAiLz48cGF0aCBzdHJva2U9InJnYigzMCwgMzAsIDMwKSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4NjggODkzKXNjYWxlKC4xKSIgZD0iTTUwIDQ0NFMyODggNjI0LCAyMjIgNDg3UzMyOCA0ODUsIDM4MCA0MjBTNTY2IDU4MSwgMzg3IDQwMFM1NzAgNDg2LCA5NTAgNTI0Ii8+PC9zdmc+IC0tPg0K"
  const owner = await contract.read.ownerOf([tokenId]);
  const editionName = await contract.read.getEdition([Math.floor(tokenId/1000000)]);

  let bufferObj = Buffer.from(
    uri.split("data:application/json;base64,")[1],
    "base64"
  );
  let metadata = JSON.parse(bufferObj.toString("utf-8"));
  return {metadata, owner, error: false, editionName: editionName.name};
  }
  catch(e) {
    return {metadata: {}, owner: "", error: true}

  }

  
  // console.log(metadata)

  

}

// console.log(publicClient.chain.id)

async function getTokenTransfers(tokenId) {

  try {

  
    const response = await Moralis.EvmApi.nft.getNFTTransfers({
      "chain": publicClient.chain.id,
      "format": "decimal",
      "order": "DESC",
      "address": artAddress,
      "tokenId": tokenId
    });
    // console.log(response.raw.result)
    return response.raw.result;
  } catch (e) {
    return {}
    // console.error(e);
  }

}





export async function generateMetadata({ params }) {
  let svg, img, base64Img;
  try{
    svg = await contract.read.getRawSvg([params.tokenId]);
    img = await sharp(Buffer.from(svg)).resize(1200).toFormat("png").toBuffer();
    base64Img = `data:image/png;base64,${img.toString('base64')}`;
  
  } catch(e) {
    base64Img = ""

  }
  
  const frameMetadata = getFrameMetadata({
    buttons: [{label: 'open sea', action: 'link', target: `https://testnets.opensea.io/assets/base-sepolia/${artAddress}/${params.tokenId}`}],
    image: {
      src: base64Img,
      aspectRatio: "1:1",
    }});

  return {
  title: '',
  description: 'frame for minting on chain art experiments',
  openGraph: {
    title: 'Experiments V1',
    description: 'frame for minting on chain art experiments',
    images: [base64Img], 
  },
  other: {
    ...frameMetadata,
  },
};


}



function truncateAddress(address) {

  return `${address.slice(0,6)}...${address.slice(-4)}`
}


async function Token({ params }) {

  const transfers = await getTokenTransfers(params?.tokenId)

  const data = await tokenData(params.tokenId);

  // if(data.error) {
  //   return  <section style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
  //     <h3>uh oh, token id #{params.tokenId} not found!</h3>

  //   </section>
  // }
  return (
    <>
    <Stats data={data} tokenId={params.tokenId} address={contract.address}/>

    <article style={{textAlign:"center"}}>
      <hr/>
        <h4>&#x2709; transfers:</h4>
        <br/>
        <ul style={{listStyleType: "none", margin: 0, padding: 0}}>
        {transfers?.map((transfer, i) => {return <li key={i} >&#x7c; &nbsp;&nbsp; &#x2709; #{transfers.length-i} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &#128337;  {new Date(transfer.block_timestamp).toLocaleString()} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &#91;{truncateAddress(transfer.from_address)}&#93; &#x279F; &#91;{truncateAddress(transfer.to_address)}&#93; &nbsp;&nbsp;&nbsp;&nbsp; <a style={{textDecoration:"none"}} target="_blank" href={`${baseScanUrl}/tx/${transfer.transaction_hash}`} >tx&#8599;</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x7c;</li>})}
        <hr/>
        </ul>
    </article>
    </>
  );
}

export default Token;


