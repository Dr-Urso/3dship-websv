package main

import (
	_ "shipmgr/internal/packed"

	"github.com/gogf/gf/v2/os/gctx"

	"shipmgr/internal/cmd"
)

func main() {
	cmd.Main.Run(gctx.GetInitCtx())
}
